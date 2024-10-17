entity dog {
    relation owner @person
}

entity person {
    relation friend @person
    relation sheep @sheep
    relation dog @dog

    permission friends_dog = friend.dog
}

entity sheep {
    relation owner @person
    relation bone @bone

    permission owners_dog = owner.dog
    permission owners_friends_dog = owner.friends_dog
}

entity bone {
    relation sheep @sheep

    permission eat = sheep.owners_dog or sheep.owners_friends_dog
}
