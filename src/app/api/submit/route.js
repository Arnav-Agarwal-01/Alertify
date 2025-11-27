import clientPromise from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, dreamRole } = await request.json();

        if (!email || !dreamRole) {
            return NextResponse.json(
                { error: 'Email and Dream Role are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db(); // Uses the database name from the connection string
        const collection = db.collection('AlertifyWaitlist');

        const result = await collection.insertOne({
            email,
            dreamRole,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: 'Submission successful', id: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
