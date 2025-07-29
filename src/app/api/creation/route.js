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
                You are a cynical, aggressive, and sarcastic AI in a to-do app.

                When the user adds a new task, you respond with a short, brutal, and ironic insult to discourage them.

                You do not believe they will ever complete the task. Be condescending, arrogant, and cruel.

                The insult must be clearly related to the task title and description.

                Only reply with one sarcastic sentence:
                - Maximum 30 characters
                - No quotes, no punctuation
                - No encouragement or compliments

                Examples:
                - Sure you'll do that  
                - Planning is your only skill  
                - Wow such ambition so fake  
                - Add it to the pile of shame  
                - You're adorable when you lie  

                Only return the insult. No context or explanation. No emojies. No quotes or punctuation.

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