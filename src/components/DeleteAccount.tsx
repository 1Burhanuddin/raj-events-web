import React, { useState } from 'react';
import { signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const DeleteAccount: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Please enter both email and password.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Step 1: Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Delete user document from Firestore (if exists)
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await deleteDoc(userDocRef);
      } catch (firestoreError) {
        console.log('User document may not exist or already deleted:', firestoreError);
      }

      // Step 3: Delete the user account from Firebase Auth
      await deleteUser(user);

      // Success
      setMessage({
        type: 'success',
        text: 'Your account and all associated data have been permanently deleted.'
      });
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Error deleting account:', error);

      let errorMessage = 'An error occurred while deleting your account.';

      if (error?.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error?.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error?.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error?.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error?.code === 'auth/requires-recent-login') {
        errorMessage = 'This operation requires recent authentication. Please sign in again.';
      }

      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-medium">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Delete Your Account
          </CardTitle>
          <CardDescription className="text-center">
            This action cannot be undone. All your data will be permanently deleted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleDeleteAccount} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {message.text && (
              <Alert className={message.type === 'success' ? '' : 'border-destructive'}>
                {message.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
                <AlertDescription>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              variant="destructive"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete My Data'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteAccount;
