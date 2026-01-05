#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

function show_menu() {
    echo -e "${YELLOW}--- Git Actions ---${NC}"
    echo "1) Status"
    echo "2) Add All & Commit"
    echo "3) Push"
    echo "4) Pull"
    echo "5) Log"
    echo "6) Exit"
}

function handle_option() {
    case $1 in
        1)
            echo -e "${GREEN}Git Status:${NC}"
            git status
            ;;
        2)
            echo -e "${GREEN}Git Status:${NC}"
            git status
            read -p "Enter commit message: " msg
            if [ -n "$msg" ]; then
                git add .
                git commit -m "$msg"
                echo -e "${GREEN}Committed changes.${NC}"
            else
                echo -e "${RED}Commit message cannot be empty.${NC}"
            fi
            ;;
        3)
            echo -e "${GREEN}Pushing to remote...${NC}"
            git push
            ;;
        4)
            echo -e "${GREEN}Pulling from remote...${NC}"
            git pull
            ;;
        5)
            git log --oneline --graph --decorate --all -n 10
            ;;
        6)
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option.${NC}"
            ;;
    esac
}

while true; do
    show_menu
    read -p "Choose an option: " choice
    handle_option $choice
    echo ""
done
