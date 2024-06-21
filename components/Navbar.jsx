import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpenPrayer, setIsDropdownOpenPrayer] = useState(false);
  const [isDropdownOpenUpdate, setIsDropdownOpenUpdate] = useState(false);
  const dropdownRefPrayer = useRef(null);
  const dropdownRefUpdate = useRef(null);
  const adminEmail = "admin@example.com";
  const router = useRouter();
  const clickSoundRef = useRef(null);

  useEffect(() => {
    clickSoundRef.current = new Audio("/long-whoosh.mp3");

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefPrayer.current &&
        !dropdownRefPrayer.current.contains(event.target)
      ) {
        setIsDropdownOpenPrayer(false);
      }
      if (
        dropdownRefUpdate.current &&
        !dropdownRefUpdate.current.contains(event.target)
      ) {
        setIsDropdownOpenUpdate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const playClickSound = () => {
    clickSoundRef.current.play();
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdownPrayer = () => {
    setIsDropdownOpenPrayer(!isDropdownOpenPrayer);
  };

  const toggleDropdownUpdate = () => {
    setIsDropdownOpenUpdate(!isDropdownOpenUpdate);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title mx-3">
        <Link href="/" onClick={playClickSound}>
          River Side
        </Link>
      </div>
      <ul className="navbar-links flex items-center">
        {user ? (
          <>
            <li className="relative" ref={dropdownRefPrayer}>
              <button onClick={toggleDropdownPrayer} className="worship-link">
                Prayer Requests
              </button>
              {isDropdownOpenPrayer && (
                <ul
                  className="absolute bg-gray-800 text-white rounded mt-2 shadow-lg"
                  onMouseEnter={() => setIsDropdownOpenPrayer(true)}
                  onMouseLeave={() => setIsDropdownOpenPrayer(false)}
                >
                  <li>
                    <Link
                      href="/prayer-request"
                      className="block px-4 py-2 hover:scale-105 transition-transform border-b border-gray-600"
                      onClick={playClickSound}
                    >
                      View Prayer Requests
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/submit-prayer-request"
                      className="block px-4 py-2 hover:scale-105 transition-transform border-b border-gray-600"
                      onClick={playClickSound}
                    >
                      Submit Prayer Request
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link href="/worship" onClick={playClickSound}>
                Our Worship
              </Link>
            </li>
            <li>
              <Link href="/facebook-live" onClick={playClickSound}>
                Face Book Live
              </Link>
            </li>
            <li>
              <Link href="/daily-posts" onClick={playClickSound}>
                Daily Posts
              </Link>
            </li>
            <li>
              <Link href="/services" onClick={playClickSound}>
                Service Times
              </Link>
            </li>
            {user.email === adminEmail && (
              <li className="relative" ref={dropdownRefUpdate}>
                <button onClick={toggleDropdownUpdate} className="upload-link">
                  Update Site
                </button>
                {isDropdownOpenUpdate && (
                  <ul
                    className="absolute bg-gray-800 text-white rounded mt-2 shadow-lg"
                    onMouseEnter={() => setIsDropdownOpenUpdate(true)}
                    onMouseLeave={() => setIsDropdownOpenUpdate(false)}
                  >
                    <li>
                      <Link
                        href="/upload-video"
                        className="block px-4 py-2 hover:scale-105 transition-transform border-b border-gray-600"
                        onClick={playClickSound}
                      >
                        Upload Video
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/alter-uploads"
                        className="block px-4 py-2 hover:scale-105 transition-transform border-b border-gray-600"
                        onClick={playClickSound}
                      >
                        Alter Video
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/update-prayer-requests"
                        className="block px-4 py-2 hover:scale-105 transition-transform border-b border-gray-600"
                        onClick={playClickSound}
                      >
                        Alter Prayer Requests
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/add-post"
                        className="block px-4 py-2 hover:scale-105 transition-transform border-b border-gray-600"
                        onClick={playClickSound}
                      >
                        Create Daily Post
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/update-daily-post"
                        className="block px-4 py-2 hover:scale-105 transition-transform border-b border-gray-600"
                        onClick={playClickSound}
                      >
                        Update Daily Post
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <li>
              <Link href="/contact-us" onClick={playClickSound}>
                Contact Us
              </Link>
            </li>
            <li className="mx-4 bg-teal-500 rounded p-1 text-center hover:bg-teal-700 text-white">
              Welcome, {user.email}
            </li>
            <li>
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
                onClick={logout}
                style={{ marginRight: "20px" }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="mx-3" href="/login" onClick={playClickSound}>
                Log In
              </Link>
            </li>
            <li>
              <Link className="mx-3" href="/register" onClick={playClickSound}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
