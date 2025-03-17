import { AuthProvider } from "./admin/AuthContext";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

const UserLayout = lazy(() => import("./layouts/UserLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const ProtectedRoute = lazy(() => import("./admin/ProtectedRoute"));
const Login = lazy(() => import("./admin/Login"));
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Career = lazy(() => import("./pages/Career"));
const SingleBlog = lazy(() => import("./pages/SingleBlog"));
const Contact = lazy(() => import("./pages/Contact"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Doctor = lazy(() => import("./admin/pages/Doctor"));
const DoctorSchedule = lazy(() => import("./admin/pages/DoctorSchedule"));
const Blog = lazy(() => import("./admin/pages/Blog"));
const Testimonial = lazy(() => import("./admin/pages/Testimonial"));
const Vacancy = lazy(() => import("./admin/pages/Vacancy"));
const AppointmentApplication = lazy(() =>
  import("./admin/pages/AppointmentApplication")
);
const JobApplication = lazy(() => import("./admin/pages/JobApplication"));
const ContactMessage = lazy(() => import("./admin/pages/ContactMessage"));
const MailingList = lazy(() => import("./admin/pages/MailingList"));

const App = () => {
  return (
    <AuthProvider>
      <MantineProvider withCssVariables>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* User Routes */}
              <Route element={<UserLayout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/career" element={<Career />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/appointment" element={<Appointment />} />
              </Route>
              {/* Login Route */}
              <Route path="/login" element={<Login />} />
              {/* Admin Routes */}
              <Route element={<ProtectedRoute element={<AdminLayout />} />}>
                <Route path="/doctor" element={<Doctor />} />
                <Route path="/doctor/:id" element={<DoctorSchedule />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/testimonial" element={<Testimonial />} />
                <Route path="/vacancy" element={<Vacancy />} />
                <Route
                  path="/appointment-application"
                  element={<AppointmentApplication />}
                />
                <Route path="/job-application" element={<JobApplication />} />
                <Route path="/contact-message" element={<ContactMessage />} />
                <Route path="/mailing-list" element={<MailingList />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  );
};

export default App;
