"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AlertsTab from "./AlertsTab";
import JobsAdminPanel from "./JobsAdminPanel";
import TestimonialAdmin from "./Course/TestimonialAdmin";
import NewsTab from "./NewsTab";
import StaffManagementTab from "./StaffManagementTab";
import EnquiriesTab from "./LeadsTab";
import ManageMetaTags from "./Course/ManageMetaTags";
import BlogComponent from "./BlogComponent";
import CollegeTab from "./CollegeTab";
import CalendarTab from "./CalendarTab";
import AboutUsTab from "./AboutUsTab";
import AboutUsSectionTab from "./AboutUsSectionTab";
import ContactTab from "./ContactTab";
import FooterTab from "./FooterTab";
import YellowStatsStripTab from "./YellowStatsStripTab";
import NewsletterSectionTab from "./NewsletterSectionTab";
import NewsletterSubscriptionsTab from "./NewsletterSubscriptionsTab";
import HeroTab from "./HeroTab";
import WhyIICPATab from "./WhyIICPATab";
import StudentsTab from "./StudentsTab";
import PaymentsTab from "./PaymentsTab";
import { useRouter } from "next/navigation";
import "react-modern-drawer/dist/index.css";
import TopicsManager from "./Topic/TopicsManager";
import GuidesTab from "./GuidesTab";
import KitsTab from "./KitsTab";
import SpecialOffersTab from "./SpecialOffers/SpecialOffersTab";

import {
  FaBars,
  FaSignOutAlt,
  FaBell,
  FaCalendarAlt,
  FaLayerGroup,
  FaHome,
  FaBook,
  FaSyncAlt,
  FaUserGraduate,
  FaUsers,
  FaBriefcase,
  FaEnvelope,
  FaQuoteRight,
  FaTags,
  FaUniversity,
  FaStarOfDavid,
  FaBlogger,
  FaNewspaper,
  FaCog,
  FaChevronDown,
  FaChevronRight,
  FaEye,
  FaFileAlt,
  FaBoxes,
  FaCreditCard,
  FaShieldAlt,
  FaStar,
  FaChartBar,
  FaMapMarkerAlt,
  FaList,
  FaUserTie,
  FaArrowLeft,
  FaComments,
  FaUser,
  FaRobot,
  FaChevronLeft,
  FaClipboardList,
  FaGraduationCap,
  FaCoins,
} from "react-icons/fa";
import CompanyTab from "./CompanyTab";
import CourseArea from "./CourseBuilder";
import CourseCategory from "./Course/CourseCategory";
import LiveSessionAdmin from "./Course/LiveSesionAdmin";
import TicketTab from "../components/TicketTab";
import RevisionTestsTab from "./RevisionTestsTab";
import CourseDisplayTab from "./CourseDisplayTab";
import IPLogsTab from "./IPLogsTab";
import IPWhitelistTab from "./IPWhitelistTab";
import DemoDigitalHubTab from "./DemoDigitalHubTab";
import FAQTab from "./FAQTab";
import CourseRatingApprovalTab from "./CourseRatingApprovalTab";
import MessagesTab from "./MessagesTab";
import BulkEmailTab from "./BulkEmailTab";
import ContactInfoTab from "./ContactInfoTab";
import AdminProfileTab from "./AdminProfileTab";
import ChatConversationsTab from "./ChatConversationsTab";
import ChatbotSettingsTab from "./ChatbotSettingsTab";
import PrivacyPolicyTab from "./PrivacyPolicyTab";
import EditPrivacyPolicyTab from "./EditPrivacyPolicyTab";
import RefundPolicyTab from "./RefundPolicyTab";
import EditRefundPolicyTab from "./EditRefundPolicyTab";
import TermsOfServiceTab from "./TermsOfServiceTab";
import EditTermsOfServiceTab from "./EditTermsOfServiceTab";
import TermsAndConditionsTab from "./TermsAndConditionsTab";
import EditTermsAndConditionsTab from "./EditTermsAndConditionsTab";
import CookiePolicyTab from "./CookiePolicyTab";
import EditCookiePolicyTab from "./EditCookiePolicyTab";
import ConfidentialityPolicyTab from "./ConfidentialityPolicyTab";
import DisclaimerPolicyTab from "./DisclaimerPolicyTab";
import IICPAReviewTab from "./IICPAReviewTab";
import EditConfidentialityPolicyTab from "./EditConfidentialityPolicyTab";
import EditDisclaimerPolicyTab from "./EditDisclaimerPolicyTab";
import EditIICPAReviewTab from "./EditIICPAReviewTab";
import TransactionsTab from "./TransactionsTab";
import IndividualRequestsTab from "./IndividualRequestsTab";
import AdmissionManagementTab from "./AdmissionManagementTab";
import UniversityCourseManagementTab from "./UniversityCourseManagementTab";
import CoinsTab from "./CoinsTab";
import BookingSettingsTab from "./BookingSettingsTab";
import AdminBookingsTab from "./AdminBookingsTab";
import InvoiceCompanySettingsTab from "./InvoiceCompanySettingsTab";
import LoginAccessControlTab from "./LoginAccessControlTab";
import JobSidebarMarqueeTab from "./JobSidebarMarqueeTab";
import LiveBookingsTab from "./LiveBookingsTab";
import OurPartnersTab from "./OurPartnersTab";

const Drawer = dynamic(() => import("react-modern-drawer"), { ssr: false });

// All available modules with their permissions (unused - replaced by NAVIGATION_GROUPS)
/*
const ALL_MODULES = [
  { id: "course-category", label: "Course Category", icon: <FaBook /> },
  { id: "course", label: "Course", icon: <FaLayerGroup /> },
  { id: "course-display", label: "Course Display", icon: <FaEye /> },
  { id: "live-session", label: "Live Session", icon: <FaCalendarAlt /> },
  {
    id: "newsletter-subscriptions",
    label: "Newsletter Subscriptions",
    icon: <FaEnvelope />,
  },
  { id: "enquiries", label: "Enquiries", icon: <FaEnvelope /> },
  { id: "messages", label: "Messages", icon: <FaComments /> },
  {
    id: "chat-conversations",
    label: "Chatbot Conversations",
    icon: <FaComments />,
  },
  { id: "chatbot-settings", label: "Chatbot Settings", icon: <FaRobot /> },
  { id: "privacy-policy", label: "Privacy Policy", icon: <FaShieldAlt /> },
  { id: "refund-policy", label: "Refund Policy", icon: <FaShieldAlt /> },
  { id: "terms-of-service", label: "Terms of Service", icon: <FaShieldAlt /> },
  {
    id: "terms-and-conditions",
    label: "Terms & Conditions",
    icon: <FaShieldAlt />,
  },
  { id: "cookie-policy", label: "Cookie Policy", icon: <FaShieldAlt /> },
  {
    id: "confidentiality-policy",
    label: "Confidentiality Policy",
    icon: <FaShieldAlt />,
  },
  {
    id: "disclaimer-policy",
    label: "Disclaimer Policy",
    icon: <FaShieldAlt />,
  },
  { id: "iicpa-review", label: "IICPA Review", icon: <FaShieldAlt /> },
  { id: "jobs", label: "Jobs", icon: <FaBriefcase /> },
  { id: "news", label: "News", icon: <FaNewspaper /> },
  { id: "students", label: "Students", icon: <FaUserGraduate /> },
  { id: "payments", label: "Payments", icon: <FaCreditCard /> },
  { id: "transactions", label: "Transactions", icon: <FaCreditCard /> },
  { id: "staff", label: "Staff Management", icon: <FaUsers /> },
  { id: "companies", label: "Companies", icon: <FaStarOfDavid /> },
  { id: "colleges", label: "Colleges", icon: <FaUniversity /> },
  { id: "calendar", label: "Calendar", icon: <FaCalendarAlt /> },
  { id: "team", label: "Our Team", icon: <FaUsers /> },
  { id: "topics", label: "Training Topics", icon: <FaBook /> },
  { id: "guides", label: "Guides & Resources", icon: <FaFileAlt /> },
  { id: "kits", label: "Kit Stock", icon: <FaBoxes /> },
  { id: "revision-tests", label: "Revision Tests", icon: <FaSyncAlt /> },
  { id: "support", label: "Support Requests", icon: <FaEnvelope /> },
  { id: "audit", label: "IP Logs", icon: <FaShieldAlt /> },
  { id: "course-ratings", label: "Course Rating Approval", icon: <FaStar /> },
  {
    id: "center-location",
    label: "Center Locations",
    icon: <FaMapMarkerAlt />,
  },
  {
    id: "special-offers",
    label: "Special Offers",
    icon: <FaStar />,
  },
];
*/

// Website Settings modules (unused - replaced by NAVIGATION_GROUPS)
/*
const WEBSITE_SETTINGS_MODULES = [
  { id: "hero", label: "Hero Section", icon: <FaHome /> },
  { id: "why-iicpa", label: "WhyIICPA Section", icon: <FaStar /> },
  { id: "about-us", label: "About Us Section", icon: <FaBook /> },
  {
    id: "about-us-section",
    label: "About Us Section Management",
    icon: <FaUserTie />,
  },
  { id: "contact", label: "Contact Section", icon: <FaEnvelope /> },
  {
    id: "contact-info",
    label: "Contact Information",
    icon: <FaMapMarkerAlt />,
  },
  { id: "footer", label: "Footer Section", icon: <FaList /> },
  {
    id: "yellow-stats-strip",
    label: "Stats Strip Section",
    icon: <FaChartBar />,
  },
  {
    id: "newsletter-section",
    label: "Newsletter Section",
    icon: <FaEnvelope />,
  },
  { id: "blogs", label: "Blogs", icon: <FaBlogger /> },
  { id: "testimonials", label: "Testimonials", icon: <FaQuoteRight /> },
  { id: "meta", label: "Manage Metatags", icon: <FaTags /> },
  { id: "alert", label: "Alert", icon: <FaBell /> },
  { id: "ip-whitelist", label: "IP Whitelisting", icon: <FaShieldAlt /> },
  { id: "demo-digital-hub", label: "Demo Digital Hub", icon: <FaBook /> },
  { id: "faq", label: "FAQ", icon: <FaUserTie /> },
  { id: "bulk-email", label: "Bulk Email", icon: <FaEnvelope /> },
];
*/

// Grouped navigation structure
const NAVIGATION_GROUPS = [
  {
    id: "course-management",
    label: "Course Management",
    icon: <FaBook />,
    items: [
      {
        id: "course-category",
        label: "Course Category",
        icon: <FaLayerGroup />,
      },
      { id: "course", label: "Course", icon: <FaBook /> },
      { id: "course-display", label: "Course Display", icon: <FaEye /> },
      { id: "topics", label: "Training Topics", icon: <FaBook /> },
      { id: "guides", label: "Guides & Resources", icon: <FaFileAlt /> },
      { id: "kits", label: "Kit Stock", icon: <FaBoxes /> },
      {
        id: "course-ratings",
        label: "Course Rating Approval",
        icon: <FaStar />,
      },
      { id: "revision-tests", label: "Revision Tests", icon: <FaSyncAlt /> },
    ],
  },
  {
    id: "session-management",
    label: "Session Management",
    icon: <FaCalendarAlt />,
    items: [
      { id: "live-session", label: "Live Session", icon: <FaCalendarAlt /> },
      {
        id: "live-bookings",
        label: "Live Bookings",
        icon: <FaClipboardList />,
      },
      { id: "calendar", label: "Calendar", icon: <FaCalendarAlt /> },
    ],
  },
  {
    id: "user-management",
    label: "User Management",
    icon: <FaUsers />,
    items: [
      { id: "students", label: "Students", icon: <FaUserGraduate /> },
      { id: "staff", label: "Staff Management", icon: <FaUsers /> },
      { id: "colleges", label: "Colleges", icon: <FaUniversity /> },
      { id: "companies", label: "Companies", icon: <FaStarOfDavid /> },
      { id: "team", label: "Our Team", icon: <FaUsers /> },
      {
        id: "individual-requests",
        label: "Individual Requests",
        icon: <FaUser />,
      },
      {
        id: "jobs-post-management",
        label: "Jobs Post Management",
        icon: <FaBriefcase />,
      },
    ],
  },
  {
    id: "content-management",
    label: "Content Management",
    icon: <FaFileAlt />,
    items: [
      { id: "blogs", label: "Blogs", icon: <FaBlogger /> },
      { id: "testimonials", label: "Testimonials", icon: <FaQuoteRight /> },
      { id: "faq", label: "FAQ", icon: <FaUserTie /> },
      { id: "about-us", label: "About Us Section", icon: <FaBook /> },
      { id: "our-partners", label: "Our Partners", icon: <FaUsers /> },
      {
        id: "about-us-section",
        label: "About Us Section Management",
        icon: <FaUserTie />,
      },
      { id: "why-iicpa", label: "WhyIICPA Section", icon: <FaStar /> },
    ],
  },
  {
    id: "website-settings",
    label: "Website Settings",
    icon: <FaCog />,
    items: [
      { id: "hero", label: "Hero Section", icon: <FaHome /> },
      { id: "contact", label: "Contact Section", icon: <FaEnvelope /> },
      {
        id: "contact-info",
        label: "Contact Information",
        icon: <FaMapMarkerAlt />,
      },
      { id: "footer", label: "Footer Section", icon: <FaList /> },
      {
        id: "yellow-stats-strip",
        label: "Stats Strip Section",
        icon: <FaChartBar />,
      },
      {
        id: "newsletter-section",
        label: "Newsletter Section",
        icon: <FaEnvelope />,
      },
      { id: "alert", label: "Alert", icon: <FaBell /> },
      { id: "demo-digital-hub", label: "Demo Digital Hub", icon: <FaBook /> },
      {
        id: "center-location",
        label: "Center Locations",
        icon: <FaMapMarkerAlt />,
      },
      {
        id: "job-sidebar-marquee",
        label: "Jobs Sidebar Marquee",
        icon: <FaBriefcase />,
      },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    icon: <FaEnvelope />,
    items: [
      { id: "enquiries", label: "Enquiries", icon: <FaEnvelope /> },
      { id: "messages", label: "Messages", icon: <FaComments /> },
      { id: "bulk-email", label: "Bulk Email", icon: <FaEnvelope /> },
      {
        id: "newsletter-subscriptions",
        label: "Newsletter Subscriptions",
        icon: <FaEnvelope />,
      },
      {
        id: "chat-conversations",
        label: "Chat Conversations",
        icon: <FaComments />,
      },
      { id: "chatbot-settings", label: "Chatbot Settings", icon: <FaRobot /> },
    ],
  },
  {
    id: "system-management",
    label: "System Management",
    icon: <FaShieldAlt />,
    items: [
      { id: "payments", label: "Payments", icon: <FaCreditCard /> },
      { id: "transactions", label: "Transactions", icon: <FaCreditCard /> },
      { id: "coins", label: "Coins", icon: <FaCoins /> },
      {
        id: "invoice-company-settings",
        label: "Invoice Company Settings",
        icon: <FaFileAlt />,
      },
      { id: "tickets", label: "Tickets", icon: <FaComments /> },
      { id: "audit", label: "IP Logs", icon: <FaShieldAlt /> },
      { id: "ip-whitelist", label: "IP Whitelisting", icon: <FaShieldAlt /> },
      { id: "meta", label: "Manage Metatags", icon: <FaTags /> },
      { id: "special-offers", label: "Special Offers", icon: <FaStar /> },
      { id: "support", label: "Support Requests", icon: <FaEnvelope /> },
      {
        id: "master-login-access",
        label: "Master Login Access",
        icon: <FaShieldAlt />,
      },
    ],
  },
  {
    id: "admission-management",
    label: "Admission Management",
    icon: <FaUserGraduate />,
    items: [
      {
        id: "admission-leads",
        label: "Admission Leads",
        icon: <FaClipboardList />,
      },
      {
        id: "university-course-management",
        label: "University Course Management",
        icon: <FaGraduationCap />,
      },
    ],
  },
  {
    id: "booking-operations",
    label: "Booking Operations",
    icon: <FaCreditCard />,
    items: [
      {
        id: "booking-settings",
        label: "Booking Settings",
        icon: <FaCog />,
      },
      {
        id: "bookings",
        label: "Bookings",
        icon: <FaClipboardList />,
      },
    ],
  },
];

function AdminDashboardContent() {
  const { user, canAccess, logout, isPrivilegedAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      "course-management": true,
      "session-management": false,
      "user-management": false,
      "content-management": false,
      "website-settings": false,
      communication: false,
      "system-management": false,
      "admission-management": false,
      "booking-operations": false,
    }
  );
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set default active tab to first accessible module only if no tab is selected
  useEffect(() => {
    if (activeTab === "") {
      // Find the first accessible item from the first expanded group
      const firstExpandedGroup = NAVIGATION_GROUPS.find(
        (group) => expandedGroups[group.id]
      );
      if (firstExpandedGroup) {
        const firstAccessibleItem = firstExpandedGroup.items.find((item) => {
          if (!user) return false;
          if (isPrivilegedAdmin(user)) return true;
          return canAccess(item.id);
        });
        if (firstAccessibleItem) {
          setActiveTab(firstAccessibleItem.id);
        }
      }
    }
  }, [activeTab, user, expandedGroups, canAccess]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin");
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    setActiveTab("");
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const activeNavigationItem = NAVIGATION_GROUPS.flatMap((group) => group.items).find(
    (item) => item.id === activeTab
  );
  const activeGroup = NAVIGATION_GROUPS.find((group) =>
    group.items.some((item) => item.id === activeTab)
  );
  const activeTitle =
    activeNavigationItem?.label ||
    (activeTab.startsWith("edit-privacy-policy")
      ? "Edit Privacy Policy"
      : activeTab.startsWith("edit-refund-policy")
      ? "Edit Refund Policy"
      : activeTab.startsWith("edit-terms-of-service")
      ? "Edit Terms of Service"
      : activeTab.startsWith("edit-terms-and-conditions")
      ? "Edit Terms & Conditions"
      : activeTab.startsWith("edit-cookie-policy")
      ? "Edit Cookie Policy"
      : activeTab.startsWith("edit-confidentiality-policy")
      ? "Edit Confidentiality Policy"
      : activeTab.startsWith("edit-disclaimer-policy")
      ? "Edit Disclaimer Policy"
      : activeTab.startsWith("edit-iicpa-review")
      ? "Edit IICPA Review"
      : activeTab === ""
      ? "Admin Dashboard"
      : "Module");
  const activeSubtitle =
    activeTab === ""
      ? "Manage content, operations, and website settings from one premium control center."
      : `${activeGroup?.label || "Dashboard"} workspace aligned with the public website visual language.`;

  // SIDEBAR: scrollable, hidden scrollbar
  const renderSidebar = (isMobile = false) => (
    <div className="h-full flex flex-col">
      <div className={`p-6 pb-4 ${!isMobile ? "relative" : ""}`}>
        {/* Collapse/Expand Button - Desktop Only */}
        {!isMobile && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute top-4 right-2 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900 z-10"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <FaChevronRight className="text-sm" />
            ) : (
              <FaChevronLeft className="text-sm" />
            )}
          </button>
        )}

        <div
          className={`flex items-center justify-center mb-6 ${
            sidebarCollapsed && !isMobile ? "px-2" : ""
          }`}
        >
          <div className="rounded-[28px] border border-white/60 bg-white/95 p-4 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.55)] backdrop-blur">
            <img
              src="/images/logo.png"
              alt="IICPA Institute"
              className={`${
                sidebarCollapsed && !isMobile ? "h-8 w-8" : "h-12 w-auto"
              } object-contain`}
            />
          </div>
        </div>

        {/* User Info */}
        {(!sidebarCollapsed || isMobile) && (
          <div
            className="mb-4 cursor-pointer rounded-[26px] border border-white/60 bg-white/80 p-4 text-center shadow-sm backdrop-blur transition hover:bg-white"
            onClick={() => {
              setActiveTab("profile");
              if (isMobile) setDrawerOpen(false);
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#0f9f6e_100%)]">
                {user?.image ? (
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
                    }${user.image}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const sibling = target.nextElementSibling as HTMLElement;
                      if (sibling) sibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    user?.image ? "hidden" : ""
                  }`}
                >
                  <FaUser size={16} className="text-white" />
                </div>
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-900">{user?.name}</p>
                <p className="text-sm text-slate-500">{user?.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-5 custom-scrollbar">
        {/* Grouped Navigation */}
        {NAVIGATION_GROUPS.map((group) => {
          // Filter group items based on user permissions
          const accessibleGroupItems = group.items.filter((item) => {
            if (!user) return false;
            if (isPrivilegedAdmin(user)) return true;
            return canAccess(item.id);
          });

          // Skip group if no accessible items
          if (accessibleGroupItems.length === 0) return null;

          const isGroupExpanded = expandedGroups[group.id];
          const hasActiveItem = accessibleGroupItems.some(
            (item) => activeTab === item.id
          );

          return (
            <div key={group.id} className="mb-2">
              {/* Group Header */}
              <button
                onClick={() => {
                  if (!isMobile) toggleGroup(group.id);
                  if (isMobile) {
                    setActiveTab(group.items[0].id);
                    setDrawerOpen(false);
                  }
                }}
                className={`flex items-center ${
                  sidebarCollapsed && !isMobile
                    ? "justify-center px-2"
                    : "justify-between gap-3 px-4"
                } py-3.5 rounded-[22px] w-full text-left transition-all duration-200 ${
                  hasActiveItem
                    ? "bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_55%,#0f9f6e_100%)] text-white font-semibold shadow-[0_14px_30px_-18px_rgba(37,99,235,0.9)]"
                    : "text-slate-700 hover:bg-white/75 hover:text-slate-900"
                }`}
                title={sidebarCollapsed && !isMobile ? group.label : ""}
              >
                <div
                  className={`flex items-center ${
                    sidebarCollapsed && !isMobile ? "" : "gap-3"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      hasActiveItem ? "text-white" : "text-blue-600"
                    }`}
                  >
                    {group.icon}
                  </span>
                  {(!sidebarCollapsed || isMobile) && (
                    <span className="font-medium">{group.label}</span>
                  )}
                </div>
                {(!sidebarCollapsed || isMobile) && (
                  <span
                    className={`text-sm transition-transform duration-200 ${
                      hasActiveItem ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {isGroupExpanded ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                )}
              </button>

              {/* Group Items */}
              {(!sidebarCollapsed || isMobile) && isGroupExpanded && (
                <div className="ml-5 mt-2 space-y-1.5 border-l border-white/50 pl-3">
                  {accessibleGroupItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (isMobile) setDrawerOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl w-full text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-white text-slate-900 font-semibold shadow-sm"
                          : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          activeTab === item.id ? "text-blue-600" : "text-slate-400"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div
      className="admin-dashboard min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,159,110,0.12),_transparent_24%),linear-gradient(180deg,#f7fbff_0%,#edf5ff_48%,#f6fbff_100%)]"
      data-admin-dashboard
    >
      {/* Sidebar - Desktop: fixed position, scrollable, hidden scrollbar */}
      <aside
        className={`hidden lg:block ${
          sidebarCollapsed ? "w-20" : "w-70"
        } fixed left-0 top-0 h-screen overflow-y-auto border-r border-white/50 bg-[linear-gradient(180deg,rgba(191,219,254,0.92)_0%,rgba(219,234,254,0.86)_35%,rgba(224,242,254,0.92)_100%)] shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur-xl custom-scrollbar z-50 transition-all duration-300`}
      >
        {renderSidebar()}
      </aside>

      {/* Topbar - Right: Bell & Logout */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-3 sm:right-6">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-slate-700 shadow-sm backdrop-blur">
            <FaBell className="text-lg" />
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">
              3
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#dc2626_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_-22px_rgba(220,38,38,0.9)] transition hover:brightness-105"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Topbar - Left: Drawer for Mobile */}
      <div className="fixed top-4 left-4 lg:hidden z-50">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/90 shadow-sm backdrop-blur transition hover:bg-white"
          title="Open menu"
        >
          <FaBars className="text-slate-700" />
        </button>
      </div>

      {/* Drawer - Mobile Sidebar: scrollable, hidden scrollbar */}
      {mounted && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          direction="left"
          className="h-full w-64 bg-[linear-gradient(180deg,rgba(191,219,254,0.96)_0%,rgba(224,242,254,0.96)_100%)] custom-scrollbar"
        >
          <div className="h-full">{renderSidebar(true)}</div>
          <button
            onClick={handleLogout}
            className="mx-3 mb-3 mt-4 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </Drawer>
      )}

      {/* Main Content: scrolls independently of sidebar */}
      <main
        className={`relative min-h-screen overflow-y-auto px-4 pb-8 pt-24 transition-all duration-300 sm:px-6 lg:px-8 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-70"
        }`}
      >
        {/* Back Button - Only show when not on dashboard home */}
        {activeTab !== "" && (
          <div className="mb-5">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <FaArrowLeft className="text-sm" />
              Back
            </button>
          </div>
        )}

        <section className="mb-6 overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(248,250,252,0.88)_45%,rgba(239,246,255,0.92)_100%)] p-6 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.35)] backdrop-blur sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                <span>IICPA Admin</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                {activeTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                {activeSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700/80">
                  Status
                </p>
                <p className="mt-2 text-lg font-semibold text-emerald-700">Live</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-700/80">
                  Workspace
                </p>
                <p className="mt-2 text-lg font-semibold text-blue-700">
                  {activeGroup?.label || "Overview"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Admin
                </p>
                <p className="mt-2 truncate text-lg font-semibold text-slate-900">
                  {user?.name || "Admin"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Permission-based content rendering */}
        <section className="rounded-[32px] border border-white/70 bg-white/88 p-4 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.3)] backdrop-blur sm:p-5 lg:p-6">
        {activeTab === "live-session" ? (
          <LiveSessionAdmin />
        ) : activeTab === "live-bookings" ? (
          <LiveBookingsTab />
        ) : activeTab === "enquiries" ? (
          <EnquiriesTab />
        ) : activeTab === "support" ? (
          <TicketTab viewerType="admin" />
        ) : activeTab === "calendar" ? (
          <CalendarTab />
        ) : activeTab === "companies" ? (
          <CompanyTab />
        ) : activeTab === "meta" ? (
          <ManageMetaTags />
        ) : activeTab === "hero" ? (
          <HeroTab />
        ) : activeTab === "why-iicpa" ? (
          <WhyIICPATab />
        ) : activeTab === "about-us" ? (
          <AboutUsTab />
        ) : activeTab === "about-us-section" ? (
          <AboutUsSectionTab />
        ) : activeTab === "contact" ? (
          <ContactTab />
        ) : activeTab === "footer" ? (
          <FooterTab />
        ) : activeTab === "yellow-stats-strip" ? (
          <YellowStatsStripTab />
        ) : activeTab === "newsletter-section" ? (
          <NewsletterSectionTab />
        ) : activeTab === "newsletter-subscriptions" ? (
          <NewsletterSubscriptionsTab />
        ) : activeTab === "colleges" ? (
          <CollegeTab />
        ) : activeTab === "blogs" ? (
          <BlogComponent />
        ) : activeTab === "course-category" ? (
          <CourseCategory />
        ) : activeTab === "students" ? (
          <StudentsTab />
        ) : activeTab === "payments" ? (
          <PaymentsTab />
        ) : activeTab === "transactions" ? (
          <TransactionsTab />
        ) : activeTab === "coins" ? (
          <CoinsTab />
        ) : activeTab === "invoice-company-settings" ? (
          <InvoiceCompanySettingsTab />
        ) : activeTab === "job-sidebar-marquee" ? (
          <JobSidebarMarqueeTab />
        ) : activeTab === "our-partners" ? (
          <OurPartnersTab />
        ) : activeTab === "booking-settings" ? (
          <BookingSettingsTab />
        ) : activeTab === "bookings" ? (
          <AdminBookingsTab />
        ) : activeTab === "jobs" ? (
          <JobsAdminPanel />
        ) : activeTab === "jobs-post-management" ? (
          <JobsAdminPanel />
        ) : activeTab === "staff" ? (
          <StaffManagementTab />
        ) : activeTab === "team" ? (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600">
              Team management view is not wired in this dashboard yet. You can
              grant and manage access for this module from Staff Management.
            </p>
          </div>
        ) : activeTab === "alert" ? (
          <AlertsTab />
        ) : activeTab === "ip-whitelist" ? (
          <IPWhitelistTab />
        ) : activeTab === "demo-digital-hub" ? (
          <DemoDigitalHubTab />
        ) : activeTab === "faq" ? (
          <FAQTab />
        ) : activeTab === "news" ? (
          <NewsTab />
        ) : activeTab === "testimonials" ? (
          <TestimonialAdmin />
        ) : activeTab === "course" ? (
          <CourseArea />
        ) : activeTab === "course-display" ? (
          <CourseDisplayTab />
        ) : activeTab === "revision-tests" ? (
          <RevisionTestsTab />
        ) : activeTab === "topics" ? (
          <TopicsManager />
        ) : activeTab === "guides" ? (
          <GuidesTab />
        ) : activeTab === "kits" ? (
          <KitsTab />
        ) : activeTab === "audit" ? (
          <IPLogsTab />
        ) : activeTab === "course-ratings" ? (
          <CourseRatingApprovalTab />
        ) : activeTab === "center-location" ? (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Center Location Management
            </h2>
            <p className="text-gray-600">
              Center location management functionality will be implemented here.
            </p>
          </div>
        ) : activeTab === "special-offers" ? (
          <SpecialOffersTab onBack={handleBack} />
        ) : activeTab === "messages" ? (
          <MessagesTab />
        ) : activeTab === "chat-conversations" ? (
          <ChatConversationsTab />
        ) : activeTab === "chatbot-settings" ? (
          <ChatbotSettingsTab />
        ) : activeTab === "privacy-policy" ? (
          <PrivacyPolicyTab
            onEditPolicy={(policyId) =>
              setActiveTab(`edit-privacy-policy-${policyId}`)
            }
          />
        ) : activeTab.startsWith("edit-privacy-policy") ? (
          <EditPrivacyPolicyTab
            onBack={() => setActiveTab("privacy-policy")}
            policyId={activeTab.replace("edit-privacy-policy-", "")}
          />
        ) : activeTab === "refund-policy" ? (
          <RefundPolicyTab
            onEditPolicy={(policyId) =>
              setActiveTab(`edit-refund-policy-${policyId}`)
            }
          />
        ) : activeTab.startsWith("edit-refund-policy") ? (
          <EditRefundPolicyTab
            onBack={() => setActiveTab("refund-policy")}
            policyId={activeTab.replace("edit-refund-policy-", "")}
          />
        ) : activeTab === "terms-of-service" ? (
          <TermsOfServiceTab
            onEditPolicy={(policyId) =>
              setActiveTab(`edit-terms-of-service-${policyId}`)
            }
          />
        ) : activeTab.startsWith("edit-terms-of-service") ? (
          <EditTermsOfServiceTab
            onBack={() => setActiveTab("terms-of-service")}
            policyId={activeTab.replace("edit-terms-of-service-", "")}
          />
        ) : activeTab === "terms-and-conditions" ? (
          <TermsAndConditionsTab
            onEditPolicy={(policyId) =>
              setActiveTab(`edit-terms-and-conditions-${policyId}`)
            }
          />
        ) : activeTab.startsWith("edit-terms-and-conditions") ? (
          <EditTermsAndConditionsTab
            onBack={() => setActiveTab("terms-and-conditions")}
            policyId={activeTab.replace("edit-terms-and-conditions-", "")}
          />
        ) : activeTab === "cookie-policy" ? (
          <CookiePolicyTab
            onEditPolicy={(policyId) =>
              setActiveTab(`edit-cookie-policy-${policyId}`)
            }
          />
        ) : activeTab.startsWith("edit-cookie-policy") ? (
          <EditCookiePolicyTab
            onBack={() => setActiveTab("cookie-policy")}
            policyId={activeTab.replace("edit-cookie-policy-", "")}
          />
        ) : activeTab === "confidentiality-policy" ? (
          <ConfidentialityPolicyTab
            onEditPolicy={(policyId) =>
              setActiveTab(`edit-confidentiality-policy-${policyId}`)
            }
          />
        ) : activeTab.startsWith("edit-confidentiality-policy") ? (
          <EditConfidentialityPolicyTab
            onBack={() => setActiveTab("confidentiality-policy")}
            policyId={activeTab.replace("edit-confidentiality-policy-", "")}
          />
        ) : activeTab === "disclaimer-policy" ? (
          <DisclaimerPolicyTab
            onEditPolicy={(policyId) =>
              setActiveTab(`edit-disclaimer-policy-${policyId}`)
            }
          />
        ) : activeTab.startsWith("edit-disclaimer-policy") ? (
          <EditDisclaimerPolicyTab
            onBack={() => setActiveTab("disclaimer-policy")}
            policyId={activeTab.replace("edit-disclaimer-policy-", "")}
          />
        ) : activeTab === "iicpa-review" ? (
          <IICPAReviewTab
            onEditReview={(reviewId) =>
              setActiveTab(`edit-iicpa-review-${reviewId}`)
            }
          />
        ) : activeTab.startsWith("edit-iicpa-review") ? (
          <EditIICPAReviewTab
            onBack={() => setActiveTab("iicpa-review")}
            reviewId={activeTab.replace("edit-iicpa-review-", "")}
          />
        ) : activeTab === "bulk-email" ? (
          <BulkEmailTab />
        ) : activeTab === "contact-info" ? (
          <ContactInfoTab />
        ) : activeTab === "profile" ? (
          <AdminProfileTab />
        ) : activeTab === "individual-requests" ? (
          <IndividualRequestsTab />
        ) : activeTab === "master-login-access" ? (
          <LoginAccessControlTab />
        ) : activeTab === "admission-leads" ? (
          <AdmissionManagementTab />
        ) : activeTab === "university-course-management" ? (
          <UniversityCourseManagementTab />
        ) : activeTab === "" ? (
          <div>
            {/* Welcome Message */}
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-600 mb-4">
                Welcome to Admin Dashboard
              </h2>
              <p className="text-gray-500">
                Please select a module from the sidebar to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-500">
              You don&apos;t have permission to access this module.
            </p>
          </div>
        )}
        </section>
      </main>
    </div>
  );
}

// Wrap the dashboard with ProtectedRoute
export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
