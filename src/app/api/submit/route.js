import clientPromise from '@/lib/db';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

        // Send Thank You Email
        try {
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                console.warn('Missing EMAIL_USER or EMAIL_PASS environment variables. Skipping email.');
                // We can throw an error here if we want to catch it below, or just return early
                throw new Error('Missing email credentials');
            }

            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || 'gmail', // Default to gmail, but allow override
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to Alertify!',
                text: `Hi there,\n\nThank you for joining the Alertify Beta Testing! We're excited to help you find your dream role\n\nWe'll notify you as soon as we launch.\n\nBest,\nThe Alertify Team`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #f97316;">Welcome to Alertify!</h1>
                        <p>Hi there,</p>
                        <p>Thank you for joining the Alertify Beta Testing! We're excited to help you find your dream role</p>
                        <p>We'll notify you as soon as we launch.</p>
                        <br/>
                        <p>Best,</p>
                        <p>The Alertify Team</p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully to:', email);

        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // We don't want to fail the request if email fails, just log it
        }

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
