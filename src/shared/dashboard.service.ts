import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@src/database";

@Injectable()
export class DashboardService {
    constructor(private readonly database: DatabaseService) {}

    public async getTotalCompanies(query: any) {
        const companies = await this.database.Company.countDocuments({
            deletedAt: { $eq: null },
            ...query,
        });
        return { total_companies: companies };
    }

    public async getTotalDataEntries(query: any) {
        const dataEntries = await this.database.DataEntry.countDocuments({
            deletedAt: { $eq: null },
            ...query,
        });
        return { total_data_entry: dataEntries };
    }

    public async getAmountByCompany(query: any) {
        const aggregate: any[] = [
            {
                $match: {
                    deletedAt: {
                        $eq: null,
                    },
                    ...query,
                },
            },
            {
                $group: {
                    _id: "$company",
                    total_amount: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "company",
                },
            },
            {
                $unwind: {
                    path: "$company",
                },
            },
            {
                $project: {
                    label: "$company.name",
                    value: "$total_amount",
                    _id: 0,
                },
            },
            {
                $sort: {
                    value: -1,
                },
            },
        ];

        const results = await this.database.DataEntry.aggregate(aggregate);
        return { companies_vs_total_amount: results };
    }

    public async getTotalAmount(query: any) {
        const aggregate: any[] = [
            {
                $match: {
                    deletedAt: { $eq: null },
                    ...query,
                },
            },
            {
                $group: {
                    _id: null,
                    total_amount: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    total_amount: 1,
                },
            },
        ];

        const results = await this.database.DataEntry.aggregate(aggregate);
        return { total_amount: results[0].total_amount };
    }
}
