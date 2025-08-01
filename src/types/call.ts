export interface StreamUser {
  user: {
    id: string;
    name: string;
  };
  token: string;
  appointmentId: string;
}

export interface StreamUserResponse {
  proStreamUser?: StreamUser;
  patientStreamUser?: StreamUser;
}
