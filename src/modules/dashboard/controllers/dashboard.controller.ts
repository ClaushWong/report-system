import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CoreAuthGuard } from "@src/auth/guards";
import { User } from "@src/decorations";
import { ClientService } from "@src/modules/client/services";
import { TransactionService } from "@src/modules/transactions/services";
import { ObjectId } from "mongodb";

@ApiTags("Core: Dashboard")
@Controller("/api/core/dashboard")
@ApiBearerAuth()
@UseGuards(CoreAuthGuard)
export class DashboardController {
  constructor(
    private readonly client: ClientService,
    private readonly transaction: TransactionService
  ) {}

  @Get()
  async getSummary(@User() user) {
    const rawCountQuery: any = {
      deletedAt: { $eq: null },
    };
    const generalQuery: any = {};
    const aggregateQuery: any = {};
    if (user?.role?.name?.toLowerCase() !== "admin") {
      rawCountQuery.user = user.id;
      generalQuery.user = user.id;
      aggregateQuery.user = new ObjectId(user.id);
    }

    const total_clients = await this.client.rawCount(rawCountQuery);
    const total_transactions =
      (await this.transaction.getTotal(generalQuery))?.total || 0;
    const total_amount = await this.transaction.getTotalValue(aggregateQuery);
    const client_vs_total_amount =
      await this.transaction.getClientVsTotalAmount(aggregateQuery);
    const category_vs_total_amount =
      await this.transaction.getCategoryVsTotalAmount(aggregateQuery);

    return {
      total_clients,
      total_transactions,
      total_amount,
      client_vs_total_amount,
      category_vs_total_amount,
    };
  }
}
