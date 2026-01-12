import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-base-300 bg-base-200">
      <div className="footer p-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <aside>
          <div className="flex items-center gap-2">
            <span className="text-primary">
              <svg
                className="h-6 w-6"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="text-lg font-bold">Care.xyz</span>
          </div>
          <p className="text-sm opacity-60 max-w-xs">
            Providing high-quality care services since 2018. Your family's safety is our top priority.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href="/services" className="link link-hover">Child Care</Link>
          <Link href="/services" className="link link-hover">Elderly Care</Link>
          <Link href="/services" className="link link-hover">Special Needs</Link>
          <Link href="/services" className="link link-hover">Pet Care</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href="/about" className="link link-hover">About Us</Link>
          <Link href="#" className="link link-hover">Careers</Link>
          <Link href="#" className="link link-hover">Trust & Safety</Link>
          <Link href="/contact" className="link link-hover">Contact</Link>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <p className="text-sm opacity-60 mb-2">Get care tips and local updates.</p>
          <fieldset className="form-control">
            <div className="join">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Join</button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-xs opacity-60">© 2024 Care.xyz Inc. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="link link-hover">Privacy Policy</Link>
            <Link href="/terms" className="link link-hover">Terms of Service</Link>
            <Link href="#" className="link link-hover">Cookie Settings</Link>
          </div>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
