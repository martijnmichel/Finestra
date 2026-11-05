import React, { useEffect, useState } from "react";
import { AppIcon } from "../components/application/AppIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Application } from "./application";
import { AppNavigation } from "../components/application/AppNavigation";
import type { NavMenu } from "./types";
import { projects } from "./projects/projects";
import { useAppState } from "../store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  requestFormSchema,
  type RequestFormValues,
} from "./request/schema";
import { submitRequest } from "./request/submitRequest.telefunc";
import MailIcon from "../icons/mail.png";
import { startApp } from "@/store/actions/startApp";
import type { AssistantActionDef } from "@/lib/assistant/types";

export class RequestApplication extends Application {
  static appName = "Request";
  public name = "Request";
  static category = "default";

  width = window.innerWidth > 900 ? 560 : window.innerWidth - 100;
  height = window.innerHeight > 900 ? 720 : window.innerHeight - 160;

  static icon = () => <AppIcon src={MailIcon} alt="Mail" />;

  static assistantActions: AssistantActionDef[] = [
    {
      id: "request:open",
      labelKey: "apps:siri.actions.requestProject",
      keywords: ["request", "aanvraag", "hire", "contact", "project", "email"],
      suggest: true,
      run: ({ dispatch }) => startApp("Request")(dispatch),
    },
  ];

  component = () => RequestForm(this.id);

  constructor(config?: ConstructorParameters<typeof Application>[0]) {
    super(config);
  }
}

export const RequestForm = (id: string) => {
  const { t } = useTranslation();
  const { applications } = useAppState();
  const app = applications.find((a) => a.id === id) as
    | RequestApplication
    | undefined;
  const relatedProject = app?.relatedProject ?? "";
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const projectOptions = Object.entries(projects()).map(([key, project]) => ({
    key,
    title: project.title,
  }));

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "web",
      relatedProject: relatedProject || "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  useEffect(() => {
    if (relatedProject) {
      form.setValue("relatedProject", relatedProject);
    }
  }, [relatedProject, form]);

  const navigation: NavMenu[] = [
    {
      label: "File",
      items: [
        {
          label: "New Email",
          function: () => {
            window.open("mailto:martijn.michel@gmail.com", "_blank");
          },
        },
        {
          label: "New Message",
          function: () => {
            window.open(
              `https://wa.me/0031624852964?text=${encodeURIComponent(
                "Hoi Martijn, ik nodig je graag uit voor een gesprek."
              )}`,
              "_blank"
            );
          },
        },
      ],
    },
  ];

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      await submitRequest(values);
      setSubmitted(true);
      form.reset({
        name: "",
        email: "",
        company: "",
        projectType: "web",
        relatedProject: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (err) {
      let message = t("apps:request.error");
      if (typeof err === "string") message = err;
      else if (err && typeof err === "object") {
        const maybe = err as { message?: unknown; value?: unknown };
        if (typeof maybe.value === "string") message = maybe.value;
        else if (typeof maybe.message === "string") {
          // Telefunc wraps Abort() strings; prefer a short user-facing line
          const cleaned = maybe.message.replace(
            /^\[telefunc@[^\]]+\]\[Abort\]\s*/i,
            ""
          );
          message = cleaned || maybe.message;
        }
      }
      setSubmitError(message);
    }
  });

  return (
    <div className="p-4 h-full overflow-y-auto">
      <AppNavigation items={navigation} id={id} appName="Request" />

      {submitted ? (
        <div className="flex flex-col gap-4 max-w-md mx-auto pt-10 text-center">
          <h2 className="text-h1">{t("apps:request.thanksTitle")}</h2>
          <p className="os-chrome-muted">{t("apps:request.thanksBody")}</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setSubmitted(false)}
          >
            {t("apps:request.sendAnother")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 max-w-md mx-auto">
          <div className="flex flex-col gap-2">
            <h2 className="text-h1">{t("apps:request.title")}</h2>
            <p className="os-chrome-muted">{t("apps:request.subtitle")}</p>
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("apps:request.fields.name")}</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("apps:request.fields.email")}</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("apps:request.fields.company")}</FormLabel>
                    <FormControl>
                      <Input autoComplete="organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("apps:request.fields.projectType")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="app">
                          {t("apps:request.projectTypes.app")}
                        </SelectItem>
                        <SelectItem value="web">
                          {t("apps:request.projectTypes.web")}
                        </SelectItem>
                        <SelectItem value="cms">
                          {t("apps:request.projectTypes.cms")}
                        </SelectItem>
                        <SelectItem value="other">
                          {t("apps:request.projectTypes.other")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relatedProject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("apps:request.fields.relatedProject")}
                    </FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "__none" ? "" : value)
                      }
                      value={field.value || "__none"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "apps:request.fields.relatedProjectPlaceholder"
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="__none">
                          {t("apps:request.fields.relatedProjectNone")}
                        </SelectItem>
                        {projectOptions.map((project) => (
                          <SelectItem key={project.key} value={project.key}>
                            {project.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("apps:request.fields.budget")}</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === "__none" ? "" : value)
                        }
                        value={field.value || "__none"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="__none">
                            {t("apps:request.optional")}
                          </SelectItem>
                          <SelectItem value="under5k">
                            {t("apps:request.budgets.under5k")}
                          </SelectItem>
                          <SelectItem value="5k15k">
                            {t("apps:request.budgets.5k15k")}
                          </SelectItem>
                          <SelectItem value="15k50k">
                            {t("apps:request.budgets.15k50k")}
                          </SelectItem>
                          <SelectItem value="50kplus">
                            {t("apps:request.budgets.50kplus")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("apps:request.fields.timeline")}</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === "__none" ? "" : value)
                        }
                        value={field.value || "__none"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="__none">
                            {t("apps:request.optional")}
                          </SelectItem>
                          <SelectItem value="asap">
                            {t("apps:request.timelines.asap")}
                          </SelectItem>
                          <SelectItem value="1to3months">
                            {t("apps:request.timelines.1to3months")}
                          </SelectItem>
                          <SelectItem value="3to6months">
                            {t("apps:request.timelines.3to6months")}
                          </SelectItem>
                          <SelectItem value="flexible">
                            {t("apps:request.timelines.flexible")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("apps:request.fields.message")}</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {submitError && (
                <p className="text-sm text-destructive">{submitError}</p>
              )}

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? t("apps:request.sending")
                  : t("apps:request.submit")}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};
