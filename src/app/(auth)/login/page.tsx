'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

import { login, FormData } from '../actions';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { data, status } = response;
      if (status === 200 && data.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        localStorage.setItem('token', data.token);
        router.push('/posts');
      }
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['login'] });
    },
    onError: (error) => {
      // handle Error
      console.log(error);
    },
  });

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleDataChange}
          />

          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleDataChange}
          />

          <Button type="submit">Login</Button>
        </form>
        <div className="text-center mt-5">
          <Link className="font-semibold text-indigo-600 hover:text-indigo-500" href="/register">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
