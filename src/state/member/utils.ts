import { decimalFactor, timeFactor } from "@/utils/locker/constants";
import { MemberAccountStruct } from "@/utils/locker/setup";
import { Member, Transaction } from "./types";
import { v5 as generateHash } from "uuid";
import BN from "bn.js";

const NAMESPACE = "e1e690c7-1da1-4063-90b7-599db1294277";

const isInitialAccount = (account: MemberAccountStruct): boolean =>
  account.timeCreated.eq(account.timeRewarded) && account.totalMatured.isZero();

const dateFromBigNumber = (bigNumber: BN): Date =>
  new Date(bigNumber.mul(timeFactor).toNumber());

export const mapTransactionFromStruct = (slots: MemberAccountStruct["slots"]) =>
  slots.reduce<Transaction[]>((slots, { withdraw, deposit }) => {
    if (withdraw) {
      slots.push({
        key: generateHash(`withdraw-${withdraw.amount}`, NAMESPACE),
        type: "withdraw",
        amount: withdraw.amount.div(decimalFactor).toNumber(),
        timeReleased: dateFromBigNumber(withdraw.timeReleased),
      });
    }

    if (deposit) {
      slots.push({
        key: generateHash(`deposit-${deposit.amount}`, NAMESPACE),
        type: "deposit",
        amount: deposit.amount.div(decimalFactor).toNumber(),
        timeCreated: dateFromBigNumber(deposit.timeCreated),
        timeMatured: dateFromBigNumber(deposit.timeMatured),
      });
    }

    return slots;
  }, []);

export const mapMemberFromStruct = (account: MemberAccountStruct): Member => {
  return {
    status: account.status,
    tier: account.tier,
    totalAmount: account.totalAmount.div(decimalFactor).toNumber(),
    totalMatured: account.totalMatured.div(decimalFactor).toNumber(),
    totalPending: account.totalPending.div(decimalFactor).toNumber(),
    totalEntries: account.totalEntries.toNumber(),
    timeCreated: dateFromBigNumber(account.timeCreated),
    timeRewarded: isInitialAccount(account)
      ? null
      : dateFromBigNumber(account.timeRewarded),
    slots: mapTransactionFromStruct(account.slots),
  };
};
