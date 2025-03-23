import { handleAuthentication } from "./authentication";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe("handleAuthentication", () => {
  const mockNavigate = jest.fn();
  const auth = getAuth();
  const db = getFirestore();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log in an existing user successfully", async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: "testUid" } });
    await handleAuthentication("test@example.com", "password123", "", "login");
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, "test@example.com", "password123");
  });

  it("should create a new account if user does not exist", async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: "auth/user-not-found" });
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: "newUserId" } });
    setDoc.mockResolvedValueOnce();

    await handleAuthentication("newuser@example.com", "newpassword", "newUsername", "create");

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, "newuser@example.com", "newpassword");
    expect(setDoc).toHaveBeenCalledWith(doc(db, "Users", "newUserId"), {
      user_id: "newUserId",
      username: "newUsername",
    });
  });

  it("should handle sign-in errors correctly", async () => {
    const error = new Error("Invalid credentials");
    signInWithEmailAndPassword.mockRejectedValueOnce(error);

    await handleAuthentication("wrong@example.com", "wrongpassword", "", "login");
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, "wrong@example.com", "wrongpassword");
  });

  it("should handle account creation errors correctly", async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: "auth/user-not-found" });
    const error = new Error("Failed to create user");
    createUserWithEmailAndPassword.mockRejectedValueOnce(error);

    await handleAuthentication("fail@example.com", "failpassword", "failUser", "create");
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, "fail@example.com", "failpassword");
  });
});
