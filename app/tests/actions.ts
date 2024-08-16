import { createClient } from "@/utils/supabase/client";

export const saveTestResults = async (tId: number, totalQuestions: number, correctAnswers: number) => { 
    const supabase = await createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from('test_userResults')
        .upsert({  userId: user?.id, tId, highScores: {total: totalQuestions, correct: correctAnswers} })
        .select()
    console.log(data)
        if (error) {
            console.error("error saving test results", error);
        }    
}