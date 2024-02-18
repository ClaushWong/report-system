import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CoreAuthGuard } from "@src/auth/guards";
import { DashboardService } from "@src/shared/dashboard.service";
import moment from "moment";

@ApiTags("Core: Dashboard")
@ApiBearerAuth()
@Controller("/api/core/dashboard")
@UseGuards(CoreAuthGuard)
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @ApiQuery({ name: "dateRange" })
  @Get("")
  async getData(@Query() { dateRange }) {
    const amountQuery: any = {};
    const companiesQuery: any = {};

    if (dateRange) {
      const dates = dateRange.split(",").map((date: string) => moment(date));
      amountQuery.date = {
        $gte: dates[0].startOf("day").toDate(),
        $lte: dates[1].endOf("day").toDate(),
      };

      companiesQuery.createdAt = {
        $gte: dates[0].startOf("day").toDate(),
        $lte: dates[1].endOf("day").toDate(),
      };
    }

    const { total_amount } = await this.dashboard.getTotalAmount(amountQuery);
    const { total_companies } = await this.dashboard.getTotalCompanies(
      companiesQuery
    );
    const { total_data_entry } = await this.dashboard.getTotalDataEntries(
      amountQuery
    );
    const { companies_vs_total_amount } =
      await this.dashboard.getAmountByCompany(amountQuery);

    return {
      total_amount,
      total_companies,
      total_data_entry,
      companies_vs_total_amount,
    };
  }
}
