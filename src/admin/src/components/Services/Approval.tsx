import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import useUpdateApproval from "../../hooks/Services/useUpdateApproval";
import { useRefresh } from "../../hooks/useRefresh";
import { toast } from "react-toastify";

const actions = [
  {
    name: "Reject",
    value: "Rejected",
    description: "Decline user request to put the service for public.",
  },
  {
    name: "Hold",
    value: "Pending",
    description: "Still on review",
  },
  {
    name: "Approve",
    value: "Approved",
    description: "Approve service and make it accessible to the public",
  },
];
const Approval = ({ isApproved, id }: { isApproved: string; id: string }) => {
  const [selected, setSelected] = useState(isApproved);
  const refresh = useRefresh();
  const { updateApproval } = useUpdateApproval(id);

  const onApprovalChange = async (value: string) => {
    try {
      const result = await updateApproval(value);
      if (result) {
        setSelected(value);
        await refresh();
        await refresh();
        toast.success("Service approval successfully updated", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      /* empty */
    }
  };

  return (
    <div className="w-full max-w-[80%] mx-auto py-16 justify-self-start">
      <div className=" w-full">
        <RadioGroup
          value={selected}
          onChange={(value) => void onApprovalChange(value)}
          defaultValue={selected}
        >
          <RadioGroup.Label className="sr-only">Approval Type</RadioGroup.Label>
          <div className="grid grid-cols-3 gap-8">
            {actions.map((action) => (
              <RadioGroup.Option
                key={action.name}
                value={action.value}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-[#641AE6] bg-opacity-75 text-white"
                      : "bg-[#1D283A]"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active: _, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  text-sky-100`}
                          >
                            {action.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline text-white`}
                          >
                            <span>{action.description}</span>{" "}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <AiFillCheckCircle className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Approval;
