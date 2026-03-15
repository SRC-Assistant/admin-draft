import { Link, useLocation } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";

const routeNames: Record<string, string> = {
  '/': 'Dashboard',
  '/users': 'Users Management',
  '/subscriptions': 'Subscriptions',
  '/usage': 'Usage Tracking',
  '/billing': 'Billing & Revenue',
  '/integrations': 'Platform Integrations',
  '/reports': 'Reports & Analytics',
  '/settings': 'Settings',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbs = [
    { path: '/', name: 'Home', icon: Home }
  ];

  let currentPath = '';
  pathnames.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      path: currentPath,
      name: routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
      icon: null
    });
  });

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = crumb.icon;

        return (
          <motion.div
            key={crumb.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center"
          >
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            )}
            {isLast ? (
              <span className="font-medium text-gray-900 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {crumb.name}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {crumb.name}
              </Link>
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}
