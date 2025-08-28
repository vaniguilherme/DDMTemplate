import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

// Configuração das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

export const useNotifications = () => {
  useEffect(() => {
    // Solicitar permissões na inicialização
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permissão de notificação negada");
      return false;
    }

    return true;
  };

  const scheduleTaskReminder = async (
    taskTitle: string,
    reminderTimeInMinutes: number
  ): Promise<string | null> => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        console.log("Sem permissão para notificações");
        return null;
      }

      // Converte minutos para segundos para teste
      let delayInSeconds: number;
      if (reminderTimeInMinutes === 1) {
        delayInSeconds = 5; // 5 segundos para teste
      } else if (reminderTimeInMinutes === 10) {
        delayInSeconds = 10; // 10 segundos para teste
      } else {
        delayInSeconds = 30; // 30 segundos para teste
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "⏰ Lembrete de Tarefa",
          body: `Não se esqueça: ${taskTitle}`,
          data: { taskTitle },
        },
        trigger: {
          seconds: delayInSeconds,
          repeats: false,
        } as any, // Temporário para evitar erro de tipo
      });

      console.log(
        `Notificação agendada para ${delayInSeconds} segundos. ID: ${notificationId}`
      );
      return notificationId;
    } catch (error) {
      console.error("Erro ao agendar notificação:", error);
      return null;
    }
  };

  const cancelNotification = async (notificationId: string) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log("Notificação cancelada:", notificationId);
    } catch (error) {
      console.error("Erro ao cancelar notificação:", error);
    }
  };

  return {
    scheduleTaskReminder,
    cancelNotification,
    requestPermissions,
  };
};
