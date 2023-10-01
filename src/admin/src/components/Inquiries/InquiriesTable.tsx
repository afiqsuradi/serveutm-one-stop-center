import { useState } from "react";
import { Inquiry } from "../../hooks/Inquiries/useInquiries";
import InquiryModal from "./InquiryModal";
import useDeleteInquiry from "../../hooks/Inquiries/useDeleteInquiry";

interface Props {
  inquiries: Inquiry[];
}

const InquiriesTable = ({ inquiries }: Props) => {
  const [inquiry, setInquiry] = useState<Inquiry>();
  const [isOpen, setIsOpen] = useState(false);
  const handleRowClick = (inquiry: Inquiry) => {
    setInquiry(inquiry);
    setIsOpen(true);
  };
  const { deleteInquiry } = useDeleteInquiry();

  const deleteEntry = async (id: string) => {
    try {
      await deleteInquiry(id);
    } catch (error) {
      //
    }
  };
  return (
    <>
      <InquiryModal isOpen={isOpen} setIsOpen={setIsOpen} inquiry={inquiry} />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {inquiries.map((inquiry) => {
              return (
                <tr
                  key={inquiry.email}
                  className="hover hover:cursor-pointer"
                  onClick={(event) => {
                    if ((event.target as HTMLElement).className.includes("btn"))
                      return;
                    handleRowClick(inquiry);
                  }}
                >
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>
                    {inquiry.message.length >= 30
                      ? inquiry.message.substring(0, 30) + "..."
                      : inquiry.message}
                  </td>
                  <th>
                    <button
                      className="btn bg-red-700 hover:bg-red-800  text-white btn-sm m-1 w-20"
                      onClick={() => {
                        void deleteEntry(inquiry._id);
                      }}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InquiriesTable;
