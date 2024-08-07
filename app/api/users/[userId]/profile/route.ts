import { userRepository } from "@/repositories/user-repository";
import { validateUserUpdate } from "@/schemas/user/schema";
import { userService } from "@/services/user-service";
import ResponseUtil from "@/utils/response-util";
import { ValidationError } from "joi";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { id: _, ...body } = await req.json();
  const { userId } = params;

  if (!parseInt(userId) || userService.getUserById(parseInt(userId)) === null) {
    return ResponseUtil.error(404, "User not found");
  }
  // validate upate fields
  try {
    validateUserUpdate(body);
  } catch (error) {
    return ResponseUtil.error(
      400,
      "Fields validate failed",
      (error as ValidationError).details
    );
  }

  // update
  const user = await userRepository.updateUser(parseInt(userId), body);
  return ResponseUtil.success(user);
}
