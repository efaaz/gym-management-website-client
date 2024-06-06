import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userRole, isLoading: isRoleLoading, error } = useQuery({
        queryKey: [user?.email, 'userRole'],
        queryFn: async () => {
            if (!user?.email) return null; // Ensure email is available
            try {
                const res = await axiosSecure.get(`/users/role/${user.email}`);
                console.log(res.data);
                return res.data?.role;
            } catch (error) {
                console.error('Error fetching user role:', error);
                throw error;
            }
        },
        enabled: !!user?.email, // Ensure the query only runs if the user email is available
    });

    return [userRole || null, isRoleLoading, error];
};

export default useUserRole;
