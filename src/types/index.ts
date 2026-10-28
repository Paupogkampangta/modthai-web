export interface ProgressDetails {
  story: number;
  ui: number;
  quests: number;
  items: number;
}

export interface DownloadLink {
  name: string;
  url: string;
  provider: 'Google Drive' | 'Mega' | 'Direct' | 'GitHub' | 'MediaFire';
  fileSize: string;
}

export interface ChangelogItem {
  version: string;
  date: string;
  changes: string[];
}

export interface InstallationGuide {
  steps: string[];
  notes: string[];
  uninstallSteps: string[];
}

export interface CommentItem {
  id: string;
  author: string;
  comment: string;
  date: string;
  rating: number;
}

export interface GameMod {
  id: string;
  title: string;
  originalTitle: string;
  category: 'RPG' | 'Action' | 'Simulation' | 'Indie' | 'Horror' | 'Adventure';
  status: 'completed' | 'in_progress' | 'beta' | 'updated';
  progress: number;
  progressDetails: ProgressDetails;
  version: string;
  gameVersion: string;
  platform: string[];
  releaseDate: string;
  lastUpdated: string;
  author: string;
  coverImage: string;
  summary: string;
  description: string;
  features: string[];
  downloads: {
    primary: DownloadLink;
    mirrors?: DownloadLink[];
  };
  downloadCount: number;
  likes: number;
  installationGuide: InstallationGuide;
  changelog: ChangelogItem[];
  comments?: CommentItem[];
}

export interface DonationConfig {
  promptPayPhone: string;
  promptPayName: string;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  trueMoneyPhone: string;
  trueMoneyGiftUrl: string;
  kofiUrl: string;
  targetGoal: number;
  currentGoalAmount: number;
  goalTitle: string;
}

export interface DonorMessage {
  id: string;
  name: string;
  amount: number;
  message: string;
  gameSupported?: string;
  timestamp: string;
  isVerified?: boolean;
}

export interface WishlistItem {
  id: string;
  title: string;
  originalTitle: string;
  genre: string;
  votes: number;
  votedByMe: boolean;
  requestedBy: string;
  reason: string;
}
