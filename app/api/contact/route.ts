import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Please provide all fields' },
                { status: 400 }
            );
        }

        await connectDB();

        const newMessage = await Message.create({
            name,
            email,
            message,
        });

        return NextResponse.json(
            { message: 'Message sent successfully!', data: newMessage },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error handling contact form:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
