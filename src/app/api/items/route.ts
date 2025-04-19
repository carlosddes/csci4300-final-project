// src/app/api/items/route.ts
import { NextResponse, NextRequest } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('cs4300final');
    const items = await db.collection('items').find({}).toArray();
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { title, description, createdBy } = body;
  
      if (!title || !description || !createdBy) {
        return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db('cs4300final');
  
      const result = await db.collection('items').insertOne({
        title,
        description,
        createdBy,
        createdAt: new Date().toISOString(),
      });
  
      return NextResponse.json({ success: true, insertedId: result.insertedId });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }

  export async function PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { _id, title, description } = body;
  
      if (!_id || !title || !description) {
        return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db('cs4300final');
  
      const result = await db.collection('items').updateOne(
        { _id: new ObjectId(_id) },
        { $set: { title, description } }
      );
  
      return NextResponse.json({ success: result.modifiedCount === 1 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }

  export async function DELETE(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json({ success: false, message: 'Missing id' }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db('your-db-name');
  
      const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });
  
      return NextResponse.json({ success: result.deletedCount === 1 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }
  
  
  
