import { useEffect } from 'react';
import { useGroupsStore } from '../../hooks/useGroupsStore';
import { useSelector } from 'react-redux';

export const NotificationsComponents = () => {
  // const notifications = notificaciones[0].notifications;
  const { handleNotifications } = useGroupsStore();

  useEffect(() => {
    handleNotifications();
  }, []);

  const { notifications } = useSelector((state) => state.group);
  return (
    <div className="fixed top-0  mt-36 z-50  border-red-500  bg-neutral-700   cursor-pointer rounded-lg">
      <ul className="h-64  w-64 space-y-2 overflow-y-auto p-2 ">
        {notifications?.map((n) => (
          <li
            key={n._id}
            className="text-sm text-neutral-100 font-light rounded-lg  bg-purple-700  p-2 "
          >
            <h4>
              <span className="font-semibold"> Name:</span> {n.name}{' '}
              {n.lastName}
            </h4>
            <p>
              <span className="font-semibold"> Message:</span> {n.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
