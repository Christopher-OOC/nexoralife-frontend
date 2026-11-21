import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  ShoppingBag, 
  Store, 
  Package, 
  ShoppingCart, 
  ClipboardList, 
  History, 
  Gift, 
  Ticket,
  Users, 
  User,
  ShieldCheck,
  Settings, 
  Info, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuthStore, selectMember } from "@/lib/store/authStore";
import { useAuth } from '@/features/auth/AuthContext';
import logo from '@/shared/assets/logo';

interface SidebarProps {
  onLogout: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, isCollapsed, onToggle, activeTab, setActiveTab }) => {
 const member = useAuthStore(selectMember);
 const { impersonating } = useAuth();

 const isAdmin = React.useMemo(() => {
   const type = member?.memberType || '';
   const normalized = type.toUpperCase();
   return !impersonating && (
     normalized === 'ADMIN' ||
     normalized === 'SUPER_ADMIN' ||
     normalized === 'ROLE_ADMIN' ||
     normalized === 'ROLE_SUPER_ADMIN'
   );
 }, [impersonating, member?.memberType]);

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BarChart3, label: 'Analysis', id: 'analysis', badge: '•' },

  { section: 'SHOPPING' },
  { icon: ShoppingBag, label: 'Discount Shop', id: 'discount-shop' },
  { icon: Store, label: 'Local Centers', id: 'service-centers' },
  { icon: Package, label: 'State Centers', id: 'premium-stores' },
  { icon: Package, label: 'National Center', id: 'company-products' },
  { icon: ShoppingCart, label: 'My Cart', id: 'my-cart' },

  { section: 'ORDERS & HISTORY' },
  { icon: ClipboardList, label: 'My Orders', id: 'my-orders' },
   { icon: ClipboardList, label: 'Manage Orders', id: 'manage-orders' },
  { icon: History, label: 'Transactions', id: 'transactions' },
  { icon: Gift, label: 'Bonuses', id: 'bonuses' },
  { icon: Ticket, label: 'Tokens', id: 'tokens' },

  { section: 'ACCOUNT' },
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Users, label: 'Genealogys', id: 'genealogys' },

  // ✅ ONLY ADMIN
  ...(isAdmin
    ? [{ icon: ShieldCheck, label: 'Admin Panel', id: 'admin-panel' }]
    : []),

  { icon: Settings, label: 'Settings', id: 'settings' },
  { icon: Info, label: 'About Us', id: 'about-us' },
];
  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} relative group/sidebar flex h-full shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-white/10 dark:bg-slate-950`}>
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-24 w-6 h-6 bg-lime-400 text-slate-950 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
      >
        <ChevronRight size={14} className={`transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>

        <div className={`flex h-16 items-center border-b border-slate-100 px-4 ${isCollapsed ? 'justify-center' : 'space-x-2'} dark:border-white/10`}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-700 shadow-sm">
          <img src={logo} alt="Logo" className="w-4 h-4 object-contain brightness-0 invert" />
        </div>
        {!isCollapsed && <span className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white">NexoraLife Global</span>}
      </div>

      <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item, index) => {
          if (item.section) {
            return !isCollapsed && (
              <div key={index} className="truncate px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {item.section}
              </div>
            );
          }

          const Icon = item.icon!;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={index}
              onClick={() => item.id && setActiveTab(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`group flex w-full items-center ${isCollapsed ? 'justify-center' : 'justify-between'} rounded-md px-3 py-2.5 transition-colors ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-lime-400/10 dark:text-lime-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={17} className={isActive ? 'text-emerald-700 dark:text-lime-300' : 'text-slate-400 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:text-slate-200'} />
                {!isCollapsed && <span className="truncate text-sm font-medium">{item.label}</span>}
              </div>
              {!isCollapsed && (
                <>
                  {item.badge && <span className="text-lime-400 text-sm leading-none">{item.badge}</span>}
                  {!item.badge && isActive && <ChevronRight size={14} className="text-emerald-700 dark:text-lime-300" />}
                </>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3 dark:border-white/10">
        <button 
          onClick={onLogout}
          title={isCollapsed ? 'Logout' : ''}
          className={`group flex w-full items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} rounded-md px-3 py-2.5 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400`}
        >
          <LogOut size={17} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};
