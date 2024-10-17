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
    permission owners_friend = owner.friend
    permission owners_friends_dog = owner.friends_dog
}

entity bone {
    relation sheep @sheep

    permission eat = sheep.owner or sheep.owners_friend or sheep.owners_dog or sheep.owners_friends_dog
}

entity dog {\n    relation owner @person\n}\n\nentity person {\n    relation friend @person\n    relation sheep @sheep\n    relation dog @dog\n\n    permission friends_dog = friend.dog\n}\n\nentity sheep {\n    relation owner @person\n    relation bone @bone\n\n    permission owners_dog = owner.dog\n    permission owners_friend = owner.friend\n    permission owners_friends_dog = owner.friends_dog\n}\n\nentity bone {\n    relation sheep @sheep\n\n    permission eat = sheep.owner or sheep.owners_friend or sheep.owners_dog or sheep.owners_friends_dog\n}\n