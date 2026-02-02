import {AktivitetType} from "@/utils/data-layer/sykmeldingSchema";
import dayjs from "dayjs";


export function findEarliestFom(aktivitet: AktivitetType[]): string {
    return aktivitet.reduce((earliest, current) =>
        current.fom < earliest.fom ? current : earliest
    ).fom
}

export function daysBetweenDates(first: string, second: string): number {
    return Math.abs(dayjs(first).diff(dayjs(second), 'day'))
}