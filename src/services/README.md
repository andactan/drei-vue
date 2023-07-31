This folder holds API layer definitions and specifications.

export const useSession = (
onOpen: OpenHandler,
onMessage: MessageHandler,
onClose: CloseHandler
): SessionHook => {
const [session, setSession] = useState(null as unkown as Websocket);
const updateOpenHandler = () => {
if (!session) return;
session.addEventListener('open', onOpen);
return () => {
session.removeEventListener('open', onOpen);
};
};

const updateMessageHandler = () => {
if (!session) return;
session.addEventListener('message', onMessage);
return () => {
session.removeEventListener('message', onMessage);
};
};

const updateCloseHandler = () => {
if (!session) return;
session.addEventListener('close', onClose);
return () => {
session.removeEventListener('close', onClose);
};
};

useEffect(updateOpenHandler, [session, onOpen]);
useEffect(updateMessageHandler, [session, onMessage]);
useEffect(updateCloseHandler, [session, onClose]);

https://dev.to/itays123/using-websockets-with-react-js-the-right-way-no-library-needed-15d0
