import {
  IconHome,
  IconSitemap,
  IconShieldLock,
  IconApps,
  IconNotebook,
  IconId,
  IconSquares,
  IconLayout2,
  IconChecklist,
  IconTimelineEventPlus,
  IconBusinessplan,
  IconSettings,
  IconCreditCardPay,
  IconDevices,
  IconBrandTeams,
  IconFileInvoice,
  IconLifebuoy,
} from "@tabler/icons-react";

export const menuList = [
  {
    devider: "Main",
  },
  {
    icon: IconHome,
    link: "My Dashboard",
    url: "/dashboard",
  },
  {
    icon: IconCreditCardPay,
    link: "KYC Transaction",
    url: "/kyc-transaction",
  },
  {
    icon: IconDevices,
    link: "Registered Devices",
    url: "/",
    // url: "/register-devices",
  },

  {
    icon: IconBrandTeams,
    link: "Team Management",
    // url: "/page-team-board",
    url: "/team-management",
  },

  {
    icon: IconFileInvoice,
    link: "Billing & Plan",
    url: "/account-billing",
  },
  {
    icon: IconLifebuoy,
    link: "Support",
    url: "/page-support-ticket",
  },
  {
    icon: IconBusinessplan,
    link: "Add Business ",
    url: "/add-business",
  },
  {
    icon: IconBusinessplan,
    link: "My Businesses ",
    url: "/my-businesses",
  },
  {
    icon: IconSettings,
    link: "Settings",
    url: "/account-setting",
  },
  {
    icon: IconShieldLock,
    link: "Privacy Policy",
    url: "/privacy-policy",
  },

  {
    icon: IconHome,
    link: "My Dashboard",
    children: [
      {
        link: "Analysis",
        url: "/",
      },
      {
        link: "My Wallet",
        url: "/index-wallet",
      },
      {
        link: "Smart IOT",
        url: "/index-iot",
      },
    ],
  },
  {
    icon: IconApps,
    link: "Applications",
    children: [
      {
        link: "Calendar",
        url: "/app-calendar",
      },
      {
        link: "tui Calendar",
        url: "/app-calendar-tui",
      },
      {
        link: "Email App",
        url: "/app-email",
      },
      {
        link: "Chat App",
        url: "/app-chat",
      },
      {
        link: "Campaigns",
        url: "/app-campaign",
      },
      {
        link: "Social App",
        url: "/app-social",
      },
      {
        link: "File Manager",
        url: "/app-file-manager",
      },
      {
        link: "Todo App",
        url: "/app-todo",
      },
      {
        link: "Contact",
        url: "/app-contact",
      },
      {
        link: "Task",
        url: "/app-task",
      },
      {
        link: "Project List",
        url: "/app-project",
      },
    ],
  },
  {
    icon: IconNotebook,
    link: "Applications",
    children: [
      {
        link: "My Profile",
        url: "/page-my-profile",
      },
      {
        link: "Bookmarks",
        url: "/page-bookmark",
      },
      {
        link: "Timeline",
        url: "/page-timeline",
      },
      {
        link: "Image Gallery",
        url: "/page-image-gallery",
      },
      {
        link: "Pricing",
        url: "/page-pricing",
      },

      {
        link: "Team Management",
        url: "/page-team-board",
      },
      {
        link: "Support",
        url: "/page-support-ticket",
      },
      {
        link: "FAQs",
        url: "/page-faq",
      },
      {
        link: "Search Page",
        url: "/page-search",
      },
      {
        link: "Footers",
        url: "/page-footer",
      },
    ],
  },
  {
    icon: IconId,
    link: "Account",
    children: [
      {
        link: "Setting",
        url: "/account-setting",
      },
      {
        link: "Invoice List",
        url: "/account-invoice",
      },
      {
        link: "Create Invoice",
        url: "/account-create-invoice",
      },
      {
        link: "Billing",
        url: "/account-billing",
      },
    ],
  },
  {
    icon: IconShieldLock,
    link: "Authentication",
    children: [
      {
        link: "404",
        url: "/auth-404",
      },
      {
        link: "Sign In",
        url: "/auth-signin",
      },
      {
        link: "Sign Up",
        url: "/auth-signup",
      },
      {
        link: "Forgot Password",
        url: "/auth-forgot-password",
      },
      {
        link: "2-Step Authentication",
        url: "/auth-two-step",
      },
      {
        link: "Lockscreen",
        url: "/auth-lockscreen",
      },
      {
        link: "Maintenance",
        url: "/auth-maintenance",
      },
    ],
  },
  {
    icon: IconSitemap,
    link: "Menu Level",
    children: [
      {
        link: "Level 1",
        children: [
          {
            link: "Level 2",
            url: "#",
          },
        ],
      },
      {
        link: "Level 1",
        url: "#",
      },
    ],
  },
  {
    devider: "RESOURCES",
  },
  {
    icon: IconSquares,
    link: "Modals Popups",
    url: "/modals",
  },
  {
    icon: IconLayout2,
    link: "Widget's",
    url: "/widget",
  },
  {
    icon: IconChecklist,
    link: "Documentation",
    url: "/doc-overview",
  },
  {
    icon: IconTimelineEventPlus,
    link: "Changelog",
    url: "/doc-changelog",
  },
];

export const documentationItem = [
  {
    devider: "DOCUMENTATION",
    color: "primary",
    fontWeight: "bold",
  },
  {
    link: "Overview",
    url: "/doc-overview",
  },
  {
    link: "Dev Setup",
    url: "/doc-setup",
  },
  {
    link: "File Structure",
    url: "/doc-structure",
  },
  {
    link: "References",
    url: "/doc-references",
  },
  {
    link: "Helper Class",
    url: "/doc-helperclass",
  },
  {
    link: "Changelog",
    url: "/doc-changelog",
  },
];

export const crmManagement = [
  {
    link: "sdfsdf",
    url: "#",
  },
  {
    link: "sdadasaffsdf",
    url: "#",
  },
];
