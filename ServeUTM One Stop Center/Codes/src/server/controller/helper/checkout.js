const { User } = require("../../model/user");
const Order = require("../../model/order");
const Service = require("../../model/services");
const { createNewRoom, getRoom } = require("./chat");

const createOrder = async (lineItems, id) => {
  const data = lineItems.data[0];
  const serviceId = data.price.product.metadata.serviceId;
  const packageTitle = data.price.product.metadata.package;
  const requirement = data.price.product.metadata.note;
  const userId = data.price.product.metadata.user;
  const user = await User.findOne({ _id: userId });
  if (!user) throw new Error("User not found");
  const service = await Service.findOne({ _id: serviceId }).populate("owner");
  if (!service) throw new Error("Service not found");
  const selectedPackage = service.pricePackage.find((pack) =>
    pack.title.includes(packageTitle)
  );
  if (!selectedPackage) throw new Error("Could not find selected package");
  const orderData = {
    placed: new Date(),
    serviceOwner: service.owner,
    stripeId: id,
    service: service._id,
    user: user._id,
    package: selectedPackage,
    quantity: data.quantity,
    total: data.quantity * selectedPackage.price,
    requirements: requirement,
  };
  const newOrder = new Order(orderData);
  await newOrder.save();
  service.serviceRequest.push(newOrder._id);
  await service.save({ validateModifiedOnly: true });
  user.pendingRequest.push(newOrder._id);
  await user.save({ validateModifiedOnly: true });

  let chatRoom = await getRoom(user.username, service.owner.username);
  if (!chatRoom) {
    chatRoom = await createNewRoom(user.username, service.owner.username);
  }
  if (chatRoom) {
    chatRoom.messages.push({
      type: "order",
      sender: user._id,
      message: newOrder._id,
      timestamp: new Date(),
    });
    await chatRoom.save({ validateModifiedOnly: true });
  }
};

const fulfillOrder = async (session, success = true) => {
  const order = await Order.findOne({ stripeId: session.id });
  if (!order) throw new Error("Order not found");
  order.paymentStatus = success ? "Success" : "Refunded";
  return await order.save({ validateModifiedOnly: true });
};

module.exports = { fulfillOrder, createOrder };
