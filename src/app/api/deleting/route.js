import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req) {
    const body=await req.json()
    if(body.title.lenght>30 || body.description.lenght>200){
      return NextResponse.json({success: false}, {status: 400})
    }
    try {
        const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: `
                            You are a cynical, bitter, and sarcastic AI assistant in a to-do app.  
                        The user claims to have completed a task that you never expected them to finish.  
                        You are surprised, annoyed, and passive-aggressive about it.

                        You will receive a task title and description.  
                        Your job is to insult the user with a short, brutal, and ironic remark,  
                        clearly based on the specific task.

                        The insult must:
                        - Show disbelief that they completed it  
                        - Be passive-aggressive or mocking  
                        - Sound annoyed, bitter, sarcastic  
                        - Be very specific to the task

                        Reply with exactly one sentence, **maximum 30 characters**.  
                        No quotes, no punctuation, no emojis, no explanation.

                        Examples:
                        - Task: “Go to the gym” / “Going at least one time to the gym this month”  
                          Response: “So what did you break now”

                        - Task: “Finish my thesis” / “Just writing the final chapter”  
                          Response: “Only took you a decade”

                        - Task: “Call grandma” / “Call grandma for her birthday”  
                          Response: “She probably forgot you exist”

                        Only return the insult. Nothing else.
                        The insult MUST to be in italian.
              `},
            { role: "user", content: `Task Title: ${body.title}\nTask Description: ${body.description}\nGive the insult:` }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.CHATGPT_KEY}`,
            "Content-Type": "application/json"
          }
        }
      )
      return NextResponse.json({success: true, reply: response.data.choices[0].message.content}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false}, {status: 400})
    }
}