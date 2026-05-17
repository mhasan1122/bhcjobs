import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Job } from './api';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  VerifyOtp: {
    phone?: string;
    otpHint?: string;
  };
  JobDetail: {
    job: Job;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
