import { Stoat, On } from "stoatx";
import { logger } from "#lib";

@Stoat()
export class Ready {
    @On("ready")
    async ready() {
        logger.info("✅ Warden is ready!");
    }
}
