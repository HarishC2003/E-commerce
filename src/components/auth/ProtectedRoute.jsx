import React from 'react';
import { Navigate } from 'react-router-dom';
import { getStoredUser } from '../../utils/auth';

/**
 * Route protector for role-based dashboard access.
 * - Redirects unauthenticated users to /login.
 * - Prevents dealers from accessing /admin/dashboard (redirects them to /dealer/dashboard).
 * - Prevents admins from accessing /dealer/dashboard (redirects them to /admin/dashboard).
 * - Redirects unsupported roles to /login.
 */
export default function ProtectedRoute({ allowedRole, children }) {
  const user = getStoredUser();

  // 1. Unauthenticated -> redirect to /login
  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  // 2. Cross-role prevention
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === 'dealer') {
      return <Navigate to="/dealer/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

