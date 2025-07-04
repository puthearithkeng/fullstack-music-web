import './Allstyle.css'
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithCustomToken,
    signInAnonymously,
    GoogleAuthProvider, // Import GoogleAuthProvider
    signInWithPopup // Import signInWithPopup
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const SignupPage = ({ onAuthSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const [auth, setAuth] = useState(null);
    const [db, setDb] = useState(null);

    useEffect(() => {
        try {
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

            if (Object.keys(firebaseConfig).length === 0) {
                console.error("Firebase config is missing. Please ensure __firebase_config is defined.");
                setError("Firebase configuration error. Cannot initialize app.");
                return;
            }

            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            const dbInstance = getFirestore(app);

            setAuth(authInstance);
            setDb(dbInstance);

            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

            if (initialAuthToken) {
                signInWithCustomToken(authInstance, initialAuthToken)
                    .then((userCredential) => {
                        console.log("Signed in with custom token:", userCredential.user.uid);
                        setUser(userCredential.user);
                        if (onAuthSuccess) {
                            onAuthSuccess(userCredential.user);
                        }
                    })
                    .catch((error) => {
                        console.error("Error signing in with custom token:", error);
                        signInAnonymously(authInstance)
                            .then((userCredential) => {
                                console.log("Signed in anonymously (fallback):", userCredential.user.uid);
                                setUser(userCredential.user);
                                if (onAuthSuccess) {
                                    onAuthSuccess(userCredential.user);
                                }
                            })
                            .catch((anonError) => {
                                console.error("Error signing in anonymously:", anonError);
                                setError("Authentication failed. Please try again.");
                            });
                    });
            } else {
                signInAnonymously(authInstance)
                    .then((userCredential) => {
                        console.log("Signed in anonymously:", userCredential.user.uid);
                        setUser(userCredential.user);
                        if (onAuthSuccess) {
                            onAuthSuccess(userCredential.user);
                        }
                    })
                    .catch((anonError) => {
                        console.error("Error signing in anonymously:", anonError);
                        setError("Authentication failed. Please try again.");
                    });
            }

            const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
                setUser(currentUser);
                if (currentUser && onAuthSuccess) {
                    onAuthSuccess(currentUser);
                }
            });

            return () => unsubscribe();
        } catch (e) {
            console.error("Failed to initialize Firebase:", e);
            setError("Failed to initialize Firebase. Check console for details.");
        }
    }, [onAuthSuccess]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!auth || !db) {
            setError("Firebase services not initialized.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up:", userCredential.user.uid);

            const userId = userCredential.user.uid;
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const userDocRef = doc(db, `artifacts/${appId}/users/${userId}/profile/data`);
            await setDoc(userDocRef, {
                email: email,
                fullName: fullName,
                username: username,
                createdAt: new Date().toISOString(),
            }, { merge: true });
            console.log("User profile created in Firestore for:", userId);

            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setFullName('');
            setUsername('');

        } catch (error) {
            console.error("Signup error:", error.code, error.message);
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Invalid email address format.');
                    break;
                case 'auth/email-already-in-use':
                    setError('This email is already in use. Try logging in.');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak. It must be at least 6 characters.');
                    break;
                default:
                    setError(`Signup failed: ${error.message}`);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);

        if (!auth) {
            setError("Firebase Auth not initialized.");
            setLoading(false);
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log("Google user signed in:", result.user.uid);

            if (db) {
                const userId = result.user.uid;
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const userDocRef = doc(db, `artifacts/${appId}/users/${userId}/profile/data`);
                await setDoc(userDocRef, {
                    email: result.user.email,
                    fullName: result.user.displayName || '',
                    username: result.user.email.split('@')[0] || '',
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                }, { merge: true });
                console.log("Google user profile created/updated in Firestore for:", userId);
            }
        } catch (error) {
            console.error("Google Sign-in error:", error.code, error.message);
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    setError('Google Sign-in popup closed.');
                    break;
                case 'auth/cancelled-popup-request':
                    setError('Google Sign-in popup was cancelled.');
                    break;
                case 'auth/operation-not-allowed':
                    setError('Google Sign-in is not enabled in Firebase. Please enable it.');
                    break;
                default:
                    setError(`Google Sign-in failed: ${error.message}`);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-red-500">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700"
                            placeholder="johndoe123"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700"
                            placeholder="your@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="shadow appearance-none border border-gray-700 rounded-md w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="flex-shrink mx-4 text-gray-400">OR</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2 focus:outline-none focus:shadow-outline transition duration-200"
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.764-1.847 4.773-6.806 4.773-4.163 0-7.542-3.32-7.542-7.408s3.379-7.408 7.542-7.408c2.906 0 4.513 1.233 5.484 2.15l3.097-3.096c-1.775-1.65-4.014-2.83-8.581-2.83-7.035 0-12.72 5.618-12.72 12.5S5.205 22 12.24 22c7.218 0 12.15-5.093 12.15-12.292 0-.756-.07-1.486-.197-2.198H12.24z"/>
                        </svg>
                        <span>Sign up with Google</span>
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Already have an account? {' '}
                        <a href="/login" className="text-red-400 hover:text-red-500 font-semibold transition duration-200">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
