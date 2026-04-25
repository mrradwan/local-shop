import { FaCity, FaLocationDot, FaPhone } from "react-icons/fa6";
import { FaTrashAlt, FaPen } from "react-icons/fa";

/**
 * Define the Address interface and export it for global use
 */
export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

/**
 * Component Props with strict TypeScript definitions
 */
interface AddressCardProps {
  address: Address;
  onDelete: (id: string) => void;
  onEdit: (address: Address) => void;
}

export default function AddressCard({
  address,
  onDelete,
  onEdit,
}: AddressCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        {/* Main Content Area */}
        <div className="flex items-start gap-4 flex-1">
          {/* Location Icon with hover effect */}
          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
            <FaLocationDot className="text-lg text-green-600" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {address.details}
            </p>

            {/* Meta Info: Phone and City */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <FaPhone className="text-xs" /> {address.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <FaCity className="text-xs" /> {address.city}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Edit and Delete */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(address)}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 flex items-center justify-center transition-colors cursor-pointer border-none outline-none shadow-none"
            title="Edit Address"
          >
            <FaPen className="text-sm" />
          </button>

          <button
            onClick={() => onDelete(address._id)}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer border-none outline-none shadow-none"
            title="Delete Address"
          >
            <FaTrashAlt className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
