'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message=An email has been sent to verify your email address')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login')

}

export async function oAuthSignIn(provider: Provider) {
  if(!provider) {
    return redirect('/login?message=No provider selected')
  }
  const supabase = createClient()
  const redirectUrl = getURL("/auth/callback")

  const { data , error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    }
  })

  // Check fpr errors

  if (error) {
    redirect('/login?message=Could not authenticate user from Oauth')
  }

  return redirect(data.url)
}