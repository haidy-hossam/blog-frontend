'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { register, FormData } from '../actions';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Invalidate and refetch
      router.push('/login');
      queryClient.invalidateQueries({ queryKey: ['register'] });
    },
    onError: (error) => {
      //handle Error
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
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Create an account</h2>
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
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
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

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
}
