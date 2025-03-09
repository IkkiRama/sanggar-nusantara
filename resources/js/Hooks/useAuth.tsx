import { usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    type: 'admin' | 'operator' | 'user';
    is_active: boolean;
    roles?: string[];
    permissions?: string[];
}

interface PageProps {
    auth: {
        user: User | null;
    };
}

export function useAuth() {
    //@ts-ignore
    const { props } = usePage<PageProps>();
    const auth = props.auth || { user: null };

    const hasRole = (role: string): boolean => {
        if (!auth.user) return false;
        return auth.user.type === role || auth.user.roles?.includes(role) || false;
    };

    const hasPermission = (permission: string): boolean => {
        if (!auth.user) return false;
        return auth.user.permissions?.includes(permission) || false;
    };

    const isAdmin = (): boolean => {
        if (!auth.user) return false;
        return auth.user.type === 'admin' || hasRole('admin');
    };

    const isOperator = (): boolean => {
        if (!auth.user) return false;
        return auth.user.type === 'operator' || hasRole('operator');
    };

    const isUser = (): boolean => {
        if (!auth.user) return false;
        return auth.user.type === 'user' || hasRole('user');
    };

    return {
        user: auth.user,
        hasRole,
        hasPermission,
        isAdmin,
        isOperator,
        isUser,
    };
}
