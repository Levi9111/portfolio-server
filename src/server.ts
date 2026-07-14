import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { fetchAndLogGithubCommits } from './app/utils/github';

async function bootstrap() {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log('✅ MongoDB connected');

    app.listen(config.port, async () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
      
      // Fetch and log GitHub commits on startup
      await fetchAndLogGithubCommits();
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

bootstrap();
