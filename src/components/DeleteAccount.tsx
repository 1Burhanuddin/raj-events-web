import React, { useEffect, useState, useRef } from 'react';
import { signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle2, Loader2, Eye, EyeOff, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

const DeleteAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please enter both email and password.' });
      return;
    }
    
    setShowConfirmDialog(true);
  };

  const startDeleteCountdown = () => {
    setCountdown(5);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          handleDeleteAccount();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const cancelDelete = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    setCountdown(null);
    setShowConfirmDialog(false);
  };

  const handleDeleteAccount = async () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    
    setCountdown(null);
    setShowConfirmDialog(false);
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      try {
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);
      } catch (firestoreError) {
        console.log('User document may not exist or already deleted:', firestoreError);
      }

      await deleteUser(user);

      setMessage({
        type: 'success',
        text: 'Your account and all associated data have been permanently deleted.'
      });
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Error deleting account:', error);

      let errorMessage = 'An unexpected error occurred while deleting your account. Please try again later.';
      let errorTitle = 'Error';

      switch (error?.code) {
        case 'auth/user-not-found':
          errorTitle = 'Account Not Found';
          errorMessage = 'No account exists with this email address. Please check the email and try again.';
          break;
        case 'auth/wrong-password':
          errorTitle = 'Incorrect Password';
          errorMessage = 'The password you entered is incorrect. Please try again or use the password reset option if you\'ve forgotten it.';
          break;
        case 'auth/invalid-email':
          errorTitle = 'Invalid Email';
          errorMessage = 'The email address you entered is not valid. Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorTitle = 'Too Many Attempts';
          errorMessage = 'Too many failed login attempts. Please try again in a few minutes or reset your password.';
          break;
        case 'auth/requires-recent-login':
          errorTitle = 'Reauthentication Required';
          errorMessage = 'For security reasons, you need to sign in again before deleting your account.';
          break;
        case 'auth/network-request-failed':
          errorTitle = 'Network Error';
          errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
          break;
        case 'auth/too-many-requests':
          errorTitle = 'Temporarily Blocked';
          errorMessage = 'This account has been temporarily blocked due to too many failed attempts. Please try again later or reset your password.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorTitle = 'Account Exists';
          errorMessage = 'An account already exists with the same email but different sign-in credentials.';
          break;
        case 'auth/operation-not-allowed':
          errorTitle = 'Operation Not Allowed';
          errorMessage = 'This operation is not allowed. Please contact support for assistance.';
          break;
        case 'auth/invalid-credential':
          errorTitle = 'Invalid Credentials';
          errorMessage = 'The email or password you entered is incorrect. Please try again.';
          break;
        default:
          if (error?.code === 'permission-denied') {
            errorTitle = 'Permission Denied';
            errorMessage = 'You do not have permission to perform this action.';
          }
      }

      setMessage({ type: 'error', text: `${errorTitle}: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white to-white p-6">
      <div className="max-w-lg mx-auto">
        <button 
          onClick={(e) => {
            e.preventDefault();
           navigate('/');
          }}
          className="mb-4 h-12 w-32 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-lime-300 rounded-full transition-colors"
          aria-label="Go back"
          disabled={loading}
          type="button"
        >
          <ArrowLeft className="h-5 w-5 text-white" /> 
          <span className="text-white font-medium">Back</span>
        </button>
        
        <Card className="w-full shadow-xl border-0 rounded-2xl overflow-hidden">
          <div className="bg-lime-400 px-6 py-4">
            <CardTitle className="text-3xl font-bold text-center">
              Delete Your Account
            </CardTitle>
          </div>
        <CardContent className="p-6">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 ">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                  className="mt-1 h-14 text-base px-4 py-3 border-gray-300 focus:border-lime-400 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="mt-1 h-14 text-base px-4 pr-12 py-3 border-gray-300 focus:border-lime-400 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {message.type && (
              <div className={message.type === 'success' ? 'bg-green-50 border border-green-200 rounded-xl p-4' : 'bg-red-50 border border-red-200 rounded-xl p-4'}>
                <div className="flex items-start">
                  {message.type === 'success' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="ml-3">
                    {message.type === 'error' && (
                      <h3 className="text-sm font-medium text-red-800">
                        {message.text.split(':')[0]}
                      </h3>
                    )}
                    <div className={message.type === 'success' ? 'mt-1 text-sm text-green-700' : 'mt-1 text-sm text-red-700'}>
                      {message.type === 'error' ? message.text.split(':').slice(1).join(':').trim() : message.text}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="destructive"
              className="w-full h-14 text-base font-medium bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 transition-colors rounded-2xl"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Deleting Account...
                </>
              ) : (
                'Delete Account Permanently'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={(open) => {
        if (!open) {
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }
          setCountdown(null);
          setShowConfirmDialog(false);
        } else {
          setShowConfirmDialog(true);
        }
      }}>
        <AlertDialogContent className="border-0 shadow-2xl rounded-2xl p-6 max-w-md">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <AlertDialogHeader className="text-center">
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              {countdown !== null ? 'Deleting in...' : 'Are you absolutely sure?'}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="mt-2 text-gray-600">
                {countdown !== null ? (
                  <div className="space-y-4">
                    <div className="text-4xl font-bold text-red-600">{countdown}s</div>
                    <p>Your account will be deleted in {countdown} seconds.</p>
                  </div>
                ) : (
                  <p>This action cannot be undone. This will permanently delete your account.</p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-center">
            {countdown !== null ? (
              <Button
                onClick={cancelDelete}
                className="w-full h-14 sm:w-auto bg-lime-400 hover:bg-lime-200 text-black hover:text-lime-400 focus:ring-2 focus:ring-lime-900 focus:ring-offset-2 transition-colors rounded-xl"
              >
                Cancel Deletion
              </Button>
            ) : (
              <>
                <AlertDialogCancel className="w-full h-14 sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:text-gray-900 focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 rounded-xl">
                  Cancel deletion
                </AlertDialogCancel>
                <Button
                  onClick={startDeleteCountdown}
                  variant="destructive"
                  className="h-14 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors rounded-2xl"
                >
                  Yes, delete my account
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
};

export default DeleteAccount;
