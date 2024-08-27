'use client'
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";

export const saveTestResults = async (router, testName: string, tId: number, totalQuestions: number, correctAnswers: number) => { 
    router.push(`/result?testName=${testName}&totalQuestions=${totalQuestions}&correctAnswers=${correctAnswers}`);
    const supabase = await createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    console.log(user?.id)
    
    const { data, error } = await supabase
        .from('test_userResults')
        .upsert([{  user_id: user?.id, tId: tId, highScores: {total: totalQuestions, correct: correctAnswers} }])
        .select()
    console.log(data)
        if (error) {
            console.error("error saving test results", error);
            redirect('/dashboard');
        }    

}