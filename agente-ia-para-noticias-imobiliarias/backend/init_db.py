import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def init_db():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        database=os.getenv("DB_NAME", "imoveisai"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "postgres")
    )
    cur = conn.cursor()
    
    try:
        # 1. Enable pgvector extension
        cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        
        # 2. Create leads table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS leads (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        # 3. Create noticias table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS noticias (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                conteudo TEXT NOT NULL,
                vetor_embedding VECTOR(768),
                data_publicacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        # 4. Create HNSW index for vector search efficiency
        cur.execute("""
            CREATE INDEX IF NOT EXISTS noticias_vetor_idx ON noticias 
            USING hnsw (vetor_embedding vector_cosine_ops);
        """)
        
        conn.commit()
        print("Database initialized successfully.")
    except Exception as e:
        conn.rollback()
        print(f"Error initializing database: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    init_db()
