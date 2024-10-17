"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const checkPermissionPayload = {
  metadata: {
    depth: 10,
  },
  entity: {
    type: "bone",
    id: "Femur",
  },
  permission: "eat",
  subject: {
    type: "dog",
    id: "Shadow",
    relation: "",
  },
};
const makeFriendsPayload = {
  metadata: {
    schema_version: "",
  },
  tuples: [
    {
      entity: {
        type: "person",
        id: "The_Farmer",
      },
      relation: "friend",
      subject: {
        type: "person",
        id: "Mad_Scientist",
        relation: "",
      },
    },
  ],
};
const breakFriendsPayload = {
  metadata: {
    schema_version: "",
  },
  tuple_filter: {
    entity: {
      type: "person",
      id: "Mad_Scientist",
    },
    relation: "friend",
    subject: {
      type: "person",
      id: "The_Farmer",
      relation: "",
    },
  },
  attribute_filter: {},
};

export default function Home() {
  const [doorOpen, setDoorOpen] = useState(false);

  async function checkPermission() {
    const response = await fetch(
      "http://localhost:3476/v1/tenants/dog-and-bone/permissions/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkPermissionPayload),
      }
    );
    const data = await response.json();
    setDoorOpen(data.can === "CHECK_RESULT_ALLOWED");
  }

  async function makeFriends() {
    const response = await fetch(
      "http://localhost:3476/v1/tenants/dog-and-bone/data/write",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(makeFriendsPayload),
      }
    );
    await response.json();
  }

  async function breakFriends() {
    const response = await fetch(
      "http://localhost:3476/v1/tenants/dog-and-bone/data/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(breakFriendsPayload),
      }
    );
    await response.json();
  }

  useEffect(() => {
    checkPermission();
    const interval = setInterval(() => {
      checkPermission();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h1>Dog and Bone</h1>
      <button onClick={makeFriends}>Make Friends</button>
      <button onClick={breakFriends}>Break Friends</button>
      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <Image src="/dog.png" alt="Dog" width={156} height={213} />
          </div>
          <div className={`${styles.column} ${styles.middle}`}>
            <Image
              src={doorOpen ? "/door_open.png" : "/door_closed.png"}
              alt="Door"
              width={157}
              height={300}
            />
          </div>
          <div className={styles.column}>
            <Image src="/bone.png" alt="Bone" width={200} height={200} />
          </div>
        </div>
      </div>
    </main>
  );
}
