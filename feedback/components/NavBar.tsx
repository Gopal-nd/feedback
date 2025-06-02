import React from 'react';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from './ui/button';
import Link from 'next/link';
import { ModeToggle } from './ModelToggel';

const NavBar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <Link href="/dashboard">
      <h1 className="text-2xl font-bold">Feedback</h1>
      </Link>
      <header className="flex justify-end items-center gap-2">
        <ModeToggle/>
        <SignedOut>
          <SignInButton>
            <Button variant="default">Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton  />
        </SignedIn>
      </header>
    </div>
  );
};

export default NavBar;
