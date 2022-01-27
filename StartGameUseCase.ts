import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {shuffleCards} from "../Cards";
import {findPlayerHand} from "./Helpers";
import {firestore} from "firebase-admin/lib/firestore";
import Transaction = firestore.Transaction;

/**
 * Deals cards.
 *
 * @param {Transaction} t
 * @param {string} tableId
 * @param {Array<any>} seats
 * @param {any} hands
 */
const dealCards = (
    t: Transaction,
    tableId: string,
    seats: Array<any>,
    hands: any
) => {
    functions.logger.info("Running dealCards");

    const cards = shuffleCards();
    const seatsInGame = seats.filter((seat: any) =>
        seat.playerId && seat.inGame && seat.status != "fold");
    seatsInGame.forEach((seat: any) => {
        const handDoc = findPlayerHand(seat.playerId, hands);
        const card1 = cards.shift();
        const card2 = cards.shift();

        t.update(handDoc?.ref, {card1: card1, card2: card2});
    });

    const deckRef = admin.firestore()
        .collection("decks")
        .doc(tableId);
    t.set(deckRef, {cards: cards});
};
