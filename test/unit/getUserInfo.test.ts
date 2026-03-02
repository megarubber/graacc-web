import getUserInfo from "~/utils/api/user/getUserInfo";
import { it } from "vitest";

it('should return user base info', async () => {
    await getUserInfo();
});
