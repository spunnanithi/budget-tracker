"use client";

import { GetHistoryPeriodsResponseType } from "@/app/api/history-periods/route";
import SkeletalWrapper from "@/components/SkeletalWrapper";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period, TimeFrame } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Props {
	period: Period;
	setPeriod: (period: Period) => void;
	timeFrame: TimeFrame;
	setTimeFrame: (timeFrame: TimeFrame) => void;
}

function HistoryPeriodSelector({
	period,
	setPeriod,
	timeFrame,
	setTimeFrame,
}: Props) {
	const historyPeriods = useQuery<GetHistoryPeriodsResponseType>({
		queryKey: ["overview", "history", "periods"],
		queryFn: () => fetch(`/api/history-periods`).then((res) => res.json()),
	});

	return (
		<div className="flex flex-wrap items-center gap-4">
			<SkeletalWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
				<Tabs
					value={timeFrame}
					onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
					<TabsList>
						<TabsTrigger value="year">Year</TabsTrigger>
						<TabsTrigger value="month">Month</TabsTrigger>
					</TabsList>
				</Tabs>
			</SkeletalWrapper>

			<div className="flex flex-wrap items-center gap-2">
				<SkeletalWrapper isLoading={historyPeriods.isFetching}>
					<YearSelector
						period={period}
						setPeriod={setPeriod}
						years={historyPeriods.data || []}
					/>
				</SkeletalWrapper>

				{timeFrame === "month" && (
					<SkeletalWrapper
						isLoading={historyPeriods.isFetching}
						fullWidth={false}>
						<MonthSelector period={period} setPeriod={setPeriod} />
					</SkeletalWrapper>
				)}
			</div>
		</div>
	);
}

export default HistoryPeriodSelector;

function YearSelector({
	period,
	setPeriod,
	years,
}: {
	period: Period;
	setPeriod: (period: Period) => void;
	years: GetHistoryPeriodsResponseType;
}) {
	return (
		<Select
			value={period.year.toString()}
			onValueChange={(value) => {
				setPeriod({ month: period.month, year: parseInt(value) });
			}}>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{years.map((year) => (
					<SelectItem key={year} value={year.toString()}>
						{year}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

function MonthSelector({
	period,
	setPeriod,
}: {
	period: Period;
	setPeriod: (period: Period) => void;
}) {
	return (
		<Select
			value={period.month.toString()}
			onValueChange={(value) => {
				setPeriod({ year: period.year, month: parseInt(value) });
			}}>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
					const monthStr = new Date(period.year, month, 1).toLocaleString(
						"default",
						{ month: "long" }
					);

					return (
						<SelectItem key={month} value={month.toString()}>
							{monthStr}
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
