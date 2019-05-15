//DBからデータを取得する
export const getData = async (db, collection, querys) => {
    //条件が指定されたときはクエリ実行
    if (querys) {
        const querySnapshot = await db
        .collection(collection)
        .where(querys[0], querys[1], querys[2])
        .get();

        return querySnapshot.docs.map(doc => {
            return doc.data();
        });
    }
    //条件が指定されていないときは全てのデータを取得
    else {
        const querySnapshot = await db
        .collection(collection)
        .get();

        return querySnapshot.docs.map(doc => {
            return doc.data();
        });
    }
}

//DBからドキュメントIDを取得する
export const getDocId = async (db, collection, querys) => {
    const querySnapshot = await db
    .collection(collection)
    .where(querys[0], querys[1], querys[2])
    .get();

    const docData = querySnapshot.docs.map(doc => {
        return doc;
    });

    return docData[0].id;
}

//DBを更新する
export const putData = async (db, collection, querys, updateData) => {
    //対象ドキュメントのIDを取得する
    const docId = await getDocId(db, collection, querys);

    //対象ドキュメントの参照を取得
    const docRef = await db.collection(collection).doc(docId);

    //更新
    await db.runTransaction(async transaction => {
        await transaction.update(docRef, updateData);
    });
}