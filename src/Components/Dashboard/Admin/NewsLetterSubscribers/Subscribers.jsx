import React from "react";
import { Helmet } from "react-helmet-async";

function Subscribers() {
  const fetchSubcribers = async (page) => {
    const response = await axios.get(
      `https://gym-management-livid.vercel.app/subscribers`
    ); // Replace with your API endpoint
    return response.data;
  };
  return (
    <>
      <Helmet>
        <title>ServiceSphere | To Do</title>
      </Helmet>
      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* <th>Service Name</th> */}
              <th>Client info</th>
              {/* <th>Service taking Date</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((service) => (
              <tr key={service._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={service.userImg}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.userName}</div>
                      <div className="text-sm opacity-50">
                        {service.userEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <select className="select select-ghost max-w-xs">
                    <option value="Pending" defaultChecked>
                      Pending
                    </option>
                    <option value="Working">Working</option>
                    <option value="Completed">Completed</option>
                  </select>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default Subscribers;
